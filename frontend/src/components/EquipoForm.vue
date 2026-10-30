<script setup lang="ts">
import { reactive, watch } from 'vue'
import { estadosEquipo, type Equipo, type EquipoFormulario } from '@/types/equipo'

const props = defineProps<{
  equipo: Equipo | null
  guardando: boolean
}>()

const emit = defineEmits<{
  guardar: [datos: EquipoFormulario]
  cancelar: []
}>()

function formularioVacio(): EquipoFormulario {
  return {
    codigoInventario: '',
    nombre: '',
    tipo: '',
    marca: '',
    modelo: '',
    ubicacion: '',
    estado: 'Disponible',
    fechaAdquisicion: '',
    observaciones: '',
  }
}

const formulario = reactive<EquipoFormulario>(formularioVacio())

watch(
  () => props.equipo,
  (equipo) => {
    Object.assign(
      formulario,
      equipo ? { ...equipo, observaciones: equipo.observaciones ?? '' } : formularioVacio(),
    )
  },
  { immediate: true },
)

function enviarFormulario() {
  emit('guardar', {
    ...formulario,
    codigoInventario: formulario.codigoInventario.trim(),
    nombre: formulario.nombre.trim(),
    observaciones: formulario.observaciones.trim(),
  })
}
</script>

<template>
  <div class="modal-fondo" @click.self="emit('cancelar')">
    <section class="modal tarjeta-formulario" aria-labelledby="titulo-formulario">
      <div class="encabezado-modal">
        <div>
          <p class="etiqueta">Datos del equipo</p>
          <h2 id="titulo-formulario">
            {{ equipo ? 'Editar equipo' : 'Registrar equipo' }}
          </h2>
        </div>
        <button
          class="boton-icono"
          type="button"
          aria-label="Cerrar formulario"
          @click="emit('cancelar')"
        >
          ×
        </button>
      </div>

      <form class="formulario" @submit.prevent="enviarFormulario">
        <label>
          Código de inventario
          <input
            v-model="formulario.codigoInventario"
            minlength="3"
            maxlength="30"
            required
            placeholder="INV-001"
          />
        </label>
        <label>
          Nombre
          <input
            v-model="formulario.nombre"
            minlength="3"
            maxlength="100"
            required
            placeholder="Notebook laboratorio"
          />
        </label>
        <label>
          Tipo
          <input v-model="formulario.tipo" required placeholder="Notebook" />
        </label>
        <label>
          Marca
          <input v-model="formulario.marca" required placeholder="Lenovo" />
        </label>
        <label>
          Modelo
          <input v-model="formulario.modelo" required placeholder="ThinkPad E14" />
        </label>
        <label>
          Ubicación
          <input v-model="formulario.ubicacion" required placeholder="Laboratorio 1" />
        </label>
        <label>
          Estado
          <select v-model="formulario.estado" required>
            <option v-for="estado in estadosEquipo" :key="estado" :value="estado">
              {{ estado }}
            </option>
          </select>
        </label>
        <label>
          Fecha de adquisición
          <input v-model="formulario.fechaAdquisicion" type="date" required />
        </label>
        <label class="campo-completo">
          Observaciones
          <textarea
            v-model="formulario.observaciones"
            rows="3"
            placeholder="Información adicional (opcional)"
          ></textarea>
        </label>

        <div class="acciones-formulario campo-completo">
          <button class="boton boton-secundario" type="button" @click="emit('cancelar')">
            Cancelar
          </button>
          <button class="boton boton-principal" type="submit" :disabled="guardando">
            {{ guardando ? 'Guardando...' : 'Guardar equipo' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

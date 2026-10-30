<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EquipoDetail from '@/components/EquipoDetail.vue'
import EquipoForm from '@/components/EquipoForm.vue'
import EquipoTable from '@/components/EquipoTable.vue'
import { actualizarEquipo, crearEquipo, eliminarEquipo, listarEquipos } from '@/services/equiposApi'
import { estadosEquipo, type Equipo, type EquipoFormulario } from '@/types/equipo'

const equipos = ref<Equipo[]>([])
const cargando = ref(false)
const guardando = ref(false)
const error = ref('')
const mensaje = ref('')
const busqueda = ref('')
const filtroEstado = ref('')
const mostrarFormulario = ref(false)
const equipoEditando = ref<Equipo | null>(null)
const equipoSeleccionado = ref<Equipo | null>(null)

const equiposFiltrados = computed(() => {
  const texto = busqueda.value.trim().toLowerCase()

  return equipos.value.filter((equipo) => {
    const coincideTexto = [
      equipo.nombre,
      equipo.codigoInventario,
      equipo.tipo,
      equipo.ubicacion,
    ].some((valor) => valor.toLowerCase().includes(texto))
    const coincideEstado = !filtroEstado.value || equipo.estado === filtroEstado.value

    return coincideTexto && coincideEstado
  })
})

const disponibles = computed(
  () => equipos.value.filter((equipo) => equipo.estado === 'Disponible').length,
)
const enMantencion = computed(
  () => equipos.value.filter((equipo) => equipo.estado === 'Mantención').length,
)

async function cargarEquipos() {
  cargando.value = true
  error.value = ''

  try {
    equipos.value = await listarEquipos()
  } catch (problema) {
    error.value =
      problema instanceof Error ? problema.message : 'No se pudo conectar con el servidor'
  } finally {
    cargando.value = false
  }
}

function nuevoEquipo() {
  equipoEditando.value = null
  mostrarFormulario.value = true
  mensaje.value = ''
}

function editarEquipo(equipo: Equipo) {
  equipoSeleccionado.value = null
  equipoEditando.value = equipo
  mostrarFormulario.value = true
  mensaje.value = ''
}

async function guardarEquipo(datos: EquipoFormulario) {
  guardando.value = true
  error.value = ''
  mensaje.value = ''

  try {
    if (equipoEditando.value) {
      await actualizarEquipo(equipoEditando.value.id, datos)
      mensaje.value = 'Los datos del equipo se actualizaron.'
    } else {
      await crearEquipo(datos)
      mensaje.value = 'El equipo se registró correctamente.'
    }

    mostrarFormulario.value = false
    equipoEditando.value = null
    await cargarEquipos()
  } catch (problema) {
    error.value = problema instanceof Error ? problema.message : 'No se pudo guardar el equipo'
  } finally {
    guardando.value = false
  }
}

async function confirmarEliminacion(equipo: Equipo) {
  const confirmar = window.confirm('¿Seguro que deseas eliminar ' + equipo.nombre + '?')
  if (!confirmar) return

  error.value = ''
  mensaje.value = ''
  try {
    await eliminarEquipo(equipo.id)
    mensaje.value = 'El equipo se eliminó correctamente.'
    await cargarEquipos()
  } catch (problema) {
    error.value = problema instanceof Error ? problema.message : 'No se pudo eliminar el equipo'
  }
}

onMounted(cargarEquipos)
</script>

<template>
  <main class="pagina">
    <header class="encabezado">
      <div>
        <p class="etiqueta">Proyecto LPW2 · Administración</p>
        <h1>Inventario tecnológico</h1>
        <p class="bajada">Registro centralizado de los equipos de la institución.</p>
      </div>
      <button class="boton boton-principal" @click="nuevoEquipo">
        <span aria-hidden="true">＋</span> Registrar equipo
      </button>
    </header>

    <section class="resumen" aria-label="Resumen del inventario">
      <article class="tarjeta-resumen">
        <span class="resumen-icono">01</span>
        <div>
          <p>Total de equipos</p>
          <strong>{{ equipos.length }}</strong>
        </div>
      </article>
      <article class="tarjeta-resumen">
        <span class="resumen-icono resumen-verde">02</span>
        <div>
          <p>Disponibles</p>
          <strong>{{ disponibles }}</strong>
        </div>
      </article>
      <article class="tarjeta-resumen">
        <span class="resumen-icono resumen-ambar">03</span>
        <div>
          <p>En mantención</p>
          <strong>{{ enMantencion }}</strong>
        </div>
      </article>
    </section>

    <section class="panel">
      <div class="panel-encabezado">
        <div>
          <p class="etiqueta">Listado general</p>
          <h2>Equipos registrados</h2>
        </div>
        <button class="boton boton-secundario" :disabled="cargando" @click="cargarEquipos">
          Actualizar
        </button>
      </div>

      <div class="filtros">
        <label class="busqueda">
          <span aria-hidden="true">⌕</span>
          <input
            v-model="busqueda"
            type="search"
            placeholder="Buscar por nombre, código, tipo o ubicación"
            aria-label="Buscar equipos"
          />
        </label>
        <select v-model="filtroEstado" aria-label="Filtrar por estado">
          <option value="">Todos los estados</option>
          <option v-for="estado in estadosEquipo" :key="estado" :value="estado">
            {{ estado }}
          </option>
        </select>
      </div>

      <p v-if="mensaje" class="aviso aviso-exito" role="status">{{ mensaje }}</p>
      <p v-if="error" class="aviso aviso-error" role="alert">{{ error }}</p>

      <div v-if="cargando" class="estado-vacio">
        <span class="indicador-carga"></span>
        <p>Cargando equipos...</p>
      </div>
      <div v-else-if="!error && equiposFiltrados.length === 0" class="estado-vacio">
        <span class="icono-vacio">⌕</span>
        <h3>No hay equipos para mostrar</h3>
        <p>Prueba con otra búsqueda o registra un equipo nuevo.</p>
      </div>
      <EquipoTable
        v-else-if="!error"
        :equipos="equiposFiltrados"
        @ver="equipoSeleccionado = $event"
        @editar="editarEquipo"
        @eliminar="confirmarEliminacion"
      />
    </section>

    <EquipoForm
      v-if="mostrarFormulario"
      :equipo="equipoEditando"
      :guardando="guardando"
      @guardar="guardarEquipo"
      @cancelar="mostrarFormulario = false"
    />
    <EquipoDetail
      v-if="equipoSeleccionado"
      :equipo="equipoSeleccionado"
      @cerrar="equipoSeleccionado = null"
    />
  </main>
</template>

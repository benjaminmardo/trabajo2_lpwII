<script setup lang="ts">
import type { Equipo } from '@/types/equipo'

defineProps<{
  equipo: Equipo
}>()

const emit = defineEmits<{
  cerrar: []
}>()
</script>

<template>
  <div class="modal-fondo" @click.self="emit('cerrar')">
    <section class="modal detalle" aria-labelledby="titulo-detalle">
      <div class="encabezado-modal">
        <div>
          <p class="etiqueta">{{ equipo.codigoInventario }}</p>
          <h2 id="titulo-detalle">{{ equipo.nombre }}</h2>
        </div>
        <button
          class="boton-icono"
          type="button"
          aria-label="Cerrar detalle"
          @click="emit('cerrar')"
        >
          ×
        </button>
      </div>
      <dl class="lista-detalle">
        <div>
          <dt>Tipo</dt>
          <dd>{{ equipo.tipo }}</dd>
        </div>
        <div>
          <dt>Marca</dt>
          <dd>{{ equipo.marca }}</dd>
        </div>
        <div>
          <dt>Modelo</dt>
          <dd>{{ equipo.modelo }}</dd>
        </div>
        <div>
          <dt>Ubicación</dt>
          <dd>{{ equipo.ubicacion }}</dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd>{{ equipo.estado }}</dd>
        </div>
        <div>
          <dt>Adquisición</dt>
          <dd>{{ equipo.fechaAdquisicion }}</dd>
        </div>
        <div class="detalle-completo">
          <dt>Observaciones</dt>
          <dd>{{ equipo.observaciones || 'Sin observaciones' }}</dd>
        </div>
      </dl>
      <div class="acciones-formulario">
        <button class="boton boton-principal" @click="emit('cerrar')">Cerrar</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Equipo } from '@/types/equipo'

defineProps<{
  equipos: Equipo[]
}>()

const emit = defineEmits<{
  ver: [equipo: Equipo]
  editar: [equipo: Equipo]
  eliminar: [equipo: Equipo]
}>()
</script>

<template>
  <div class="tabla-contenedor">
    <table>
      <thead>
        <tr>
          <th>Equipo</th>
          <th>Código</th>
          <th>Ubicación</th>
          <th>Estado</th>
          <th class="columna-acciones">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="equipo in equipos" :key="equipo.id">
          <td>
            <strong>{{ equipo.nombre }}</strong>
            <span class="texto-secundario"> {{ equipo.tipo }} · {{ equipo.marca }} </span>
          </td>
          <td class="codigo">{{ equipo.codigoInventario }}</td>
          <td>{{ equipo.ubicacion }}</td>
          <td>
            <span class="estado" :class="'estado-' + equipo.estado.toLowerCase().replace(' ', '-')">
              {{ equipo.estado }}
            </span>
          </td>
          <td class="acciones-tabla">
            <button class="enlace-boton" @click="emit('ver', equipo)">Ver</button>
            <button class="enlace-boton" @click="emit('editar', equipo)">Editar</button>
            <button class="enlace-boton enlace-peligro" @click="emit('eliminar', equipo)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

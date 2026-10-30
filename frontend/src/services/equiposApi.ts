import type { Equipo, EquipoFormulario } from '@/types/equipo'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

async function solicitar<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const respuesta = await fetch(API_URL + ruta, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...opciones.headers,
    },
  })

  let contenido: unknown = null
  try {
    contenido = await respuesta.json()
  } catch {
    contenido = null
  }

  if (!respuesta.ok) {
    const detalle = contenido as {
      message?: string | string[]
      error?: string
    } | null
    const mensajes = Array.isArray(detalle?.message) ? detalle.message.join(', ') : detalle?.message
    throw new Error(mensajes || detalle?.error || 'Ocurrió un error en la API')
  }

  return contenido as T
}

export function listarEquipos(): Promise<Equipo[]> {
  return solicitar<Equipo[]>('/equipos')
}

export function crearEquipo(datos: EquipoFormulario): Promise<Equipo> {
  return solicitar<Equipo>('/equipos', {
    method: 'POST',
    body: JSON.stringify(datos),
  })
}

export function actualizarEquipo(id: number, datos: EquipoFormulario): Promise<Equipo> {
  return solicitar<Equipo>('/equipos/' + id, {
    method: 'PATCH',
    body: JSON.stringify(datos),
  })
}

export function eliminarEquipo(id: number): Promise<{ mensaje: string }> {
  return solicitar<{ mensaje: string }>('/equipos/' + id, {
    method: 'DELETE',
  })
}

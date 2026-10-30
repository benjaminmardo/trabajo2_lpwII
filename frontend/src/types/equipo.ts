export const estadosEquipo = ['Disponible', 'En uso', 'Mantención', 'Baja'] as const

export type EstadoEquipo = (typeof estadosEquipo)[number]

export interface Equipo {
  id: number
  codigoInventario: string
  nombre: string
  tipo: string
  marca: string
  modelo: string
  ubicacion: string
  estado: EstadoEquipo
  fechaAdquisicion: string
  observaciones: string | null
}

export type EquipoFormulario = Omit<Equipo, 'id' | 'observaciones'> & {
  observaciones: string
}

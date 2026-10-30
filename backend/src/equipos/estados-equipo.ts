export const ESTADOS_EQUIPO = [
  'Disponible',
  'En uso',
  'Mantención',
  'Baja',
] as const;

export type EstadoEquipo = (typeof ESTADOS_EQUIPO)[number];

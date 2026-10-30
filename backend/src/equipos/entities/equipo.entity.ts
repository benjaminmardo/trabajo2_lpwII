import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ESTADOS_EQUIPO } from '../estados-equipo.js';
import type { EstadoEquipo } from '../estados-equipo.js';

@Entity('equipos')
export class Equipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  codigoInventario: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 60 })
  tipo: string;

  @Column({ length: 60 })
  marca: string;

  @Column({ length: 80 })
  modelo: string;

  @Column({ length: 100 })
  ubicacion: string;

  @Column({ type: 'enum', enum: [...ESTADOS_EQUIPO] })
  estado: EstadoEquipo;

  @Column({ type: 'date' })
  fechaAdquisicion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string | null;
}

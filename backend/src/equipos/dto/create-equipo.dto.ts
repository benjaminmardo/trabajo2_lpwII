import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ESTADOS_EQUIPO } from '../estados-equipo.js';

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  codigoInventario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsIn([...ESTADOS_EQUIPO])
  estado: (typeof ESTADOS_EQUIPO)[number];

  @IsDateString()
  fechaAdquisicion: string;

  @IsOptional()
  @IsString()
  observaciones?: string | null;
}

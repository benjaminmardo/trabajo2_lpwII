import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipoDto } from './dto/create-equipo.dto.js';
import { UpdateEquipoDto } from './dto/update-equipo.dto.js';
import { Equipo } from './entities/equipo.entity.js';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,
  ) {}

  listar(): Promise<Equipo[]> {
    return this.equiposRepository.find({ order: { id: 'ASC' } });
  }

  async buscarPorId(id: number): Promise<Equipo> {
    const equipo = await this.equiposRepository.findOneBy({ id });

    if (!equipo) {
      throw new NotFoundException('No se encontró un equipo con ese ID');
    }

    return equipo;
  }

  crear(datos: CreateEquipoDto): Promise<Equipo> {
    const nuevoEquipo = this.equiposRepository.create(datos);
    return this.equiposRepository.save(nuevoEquipo);
  }

  async actualizar(id: number, datos: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.buscarPorId(id);
    Object.assign(equipo, datos);
    return this.equiposRepository.save(equipo);
  }

  async eliminar(id: number): Promise<{ mensaje: string }> {
    const equipo = await this.buscarPorId(id);
    await this.equiposRepository.remove(equipo);
    return { mensaje: 'Equipo eliminado correctamente' };
  }
}

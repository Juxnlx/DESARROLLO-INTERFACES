import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { DepartamentoDTO } from "../dtos/DepartamentoDTO";
import { Departamento } from "../entities/Departamento";
import { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import { IDepartamentoUseCase } from "../interfaces/usecases/IDepartamentoUseCase";

@injectable()
export class DepartamentoUseCase implements IDepartamentoUseCase {
  private readonly _departamentoRepository: IDepartamentoRepository;

  constructor(
    @inject(TYPES.IDepartamentoRepository) departamentoRepository: IDepartamentoRepository
  ) {
    this._departamentoRepository = departamentoRepository;
  }

  async getAllDepartamentos(): Promise<Departamento[]> {
    const resultado = await this._departamentoRepository.getAllDepartamentos();
    return resultado;
  }

  async editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<Departamento> {
    // Convertir Entidad a DTO
    const dto: DepartamentoDTO = {
      id: departamento.id,
      nombre: departamento.nombre
    };
    
    const resultado = await this._departamentoRepository.editarDepartamento(idDepartamentoEditar, dto);
    return resultado;
  }

  async insertarDepartamento(departamentoNuevo: Departamento): Promise<Departamento> {
    // Convertir Entidad a DTO
    const dto: DepartamentoDTO = {
      id: departamentoNuevo.id,
      nombre: departamentoNuevo.nombre
    };
    
    const resultado = await this._departamentoRepository.insertarDepartamento(dto);
    return resultado;
  }

  async eliminarDepartamento(idDepartamentoEliminar: number): Promise<boolean> {
    const resultado = await this._departamentoRepository.deleteDepartamento(idDepartamentoEliminar);
    return resultado;
  }
}
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../core/types";
import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
import { Departamento } from "../../domain/entities/Departamento";
import { IDepartamentoRepository } from "../../domain/interfaces/repositories/IDepartamentoRepository";
import { AzureAPI } from "../datasource/AzureAPI";

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  private readonly _azureAPI: AzureAPI;

  constructor(@inject(TYPES.AzureAPI) azureAPI: AzureAPI) {
    this._azureAPI = azureAPI;
  }

  async getAllDepartamentos(): Promise<Departamento[]> {
    const dtos = await this._azureAPI.obtenerListaDepartamentos();
    return dtos.map(dto => new Departamento(dto.id, dto.nombre));
  }

  async getDepartamentoById(id: number): Promise<Departamento | null> {
    try {
      const dto = await this._azureAPI.obtenerDepartamentoPorId(id);
      return new Departamento(dto.id, dto.nombre);
    } catch {
      return null;
    }
  }

  async insertarDepartamento(departamentoDTO: DepartamentoDTO): Promise<Departamento> {
    await this._azureAPI.crearDepartamento(departamentoDTO);
    return new Departamento(departamentoDTO.id, departamentoDTO.nombre);
  }

  async editarDepartamento(id: number, departamentoDTO: DepartamentoDTO): Promise<Departamento> {
    await this._azureAPI.actualizarDepartamento(id, departamentoDTO);
    return new Departamento(departamentoDTO.id, departamentoDTO.nombre);
  }

  async deleteDepartamento(id: number): Promise<boolean> {
    try {
      await this._azureAPI.eliminarDepartamento(id);
      return true;
    } catch {
      return false;
    }
  }
}
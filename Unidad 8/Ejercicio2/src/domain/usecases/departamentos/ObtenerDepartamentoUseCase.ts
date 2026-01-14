import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { Departamento } from "../../entities/Departamento";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import type { IObtenerDepartamentosUseCase } from "../../interfaces/usecases/departamentos/IObtenerDepartamentoUseCase";

@injectable()
export class ObtenerDepartamentosUseCase implements IObtenerDepartamentosUseCase {
    
    constructor(
        @inject(TYPES.IDepartamentoRepository) private repositorioDepartamentos: IDepartamentoRepository
    ) {}

    async obtenerDepartamentos(): Promise<Departamento[]> {
        return await this.repositorioDepartamentos.getAllDepartamentos();
    }

    async obtenerDepartamentoPorId(id: number): Promise<Departamento | null> {
        return await this.repositorioDepartamentos.getDepartamentoById(id);
    }
}
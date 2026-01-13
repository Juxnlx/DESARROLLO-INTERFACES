import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../core/types";
import { Departamento } from "../../entities/Departamento";
import type { IObtenerDepartamentosUseCase } from "../../interfaces/usecases/departamentos/IObtenerDepartamentoUseCase";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";

/**
 * Caso de uso para obtener departamentos.
 */
@injectable()
export class ObtenerDepartamentosUseCase implements IObtenerDepartamentosUseCase {
    
    constructor(
        @inject(TYPES.IDepartamentoRepository) private repositorioDepartamentos: IDepartamentoRepository
    ) {}

    /**
     * Obtiene todos los departamentos.
     * @returns Promise con array de departamentos
     */
    async obtenerDepartamentos(): Promise<Departamento[]> {
        return await this.repositorioDepartamentos.getAllDepartamentos();
    }

    /**
     * Obtiene un departamento específico por ID.
     * @param id - ID del departamento
     * @returns Promise con el departamento o null
     */
    async obtenerDepartamentoPorId(id: number): Promise<Departamento | null> {
        return await this.repositorioDepartamentos.getDepartamentoById(id);
    }
}
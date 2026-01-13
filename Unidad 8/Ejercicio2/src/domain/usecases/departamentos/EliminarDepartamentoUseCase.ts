import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../core/types";
import type { IEliminarDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IEliminarDepartamentoUseCase";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";

/**
 * Caso de uso para eliminar departamentos.
 */
@injectable()
export class EliminarDepartamentoUseCase implements IEliminarDepartamentoUseCase {
    
    constructor(
        @inject(TYPES.IDepartamentoRepository) private repositorioDepartamentos: IDepartamentoRepository
    ) {}

    /**
     * Elimina un departamento del sistema.
     * @param id - ID del departamento a eliminar
     * @returns Promise con true si se eliminó
     */
    async eliminar(id: number): Promise<boolean> {
        return await this.repositorioDepartamentos.deleteDepartamento(id);
    }
}
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import type { IEliminarDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IEliminarDepartamentoUseCase";

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
     * @returns Promise con true si se elimino
     */
    async eliminar(id: number): Promise<boolean> {
        return await this.repositorioDepartamentos.deleteDepartamento(id);
    }
}
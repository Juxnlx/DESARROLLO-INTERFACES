import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { DepartamentoDTO } from "../../dtos/DepartamentoDTO";
import { Departamento } from "../../entities/Departamento";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import type { IActualizarDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IActualizarDepartamentoUseCase";

/**
 * Caso de uso para actualizar departamentos.
 */
@injectable()
export class ActualizarDepartamentoUseCase implements IActualizarDepartamentoUseCase {
    
    constructor(
        @inject(TYPES.IDepartamentoRepository) private repositorioDepartamentos: IDepartamentoRepository
    ) {}

    /**
     * Actualiza un departamento existente.
     * @param id - ID del departamento a actualizar
     * @param departamento - DTO con nuevos datos
     * @returns Promise con el departamento actualizado
     */
    async actualizar(id: number, departamento: DepartamentoDTO): Promise<Departamento> {
        return await this.repositorioDepartamentos.editarDepartamento(id, departamento);
    }
}
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../core/types";
import { Departamento } from "../../entities/Departamento";
import { DepartamentoDTO } from "../../dtos/DepartamentoDTO";
import type { ICrearDepartamentoUseCase } from "../../interfaces/usecases/departamentos/ICrearDepartamentoUseCase";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";

/**
 * Caso de uso para crear departamentos.
 */
@injectable()
export class CrearDepartamentoUseCase implements ICrearDepartamentoUseCase {
    
    constructor(
        @inject(TYPES.IDepartamentoRepository) private repositorioDepartamentos: IDepartamentoRepository
    ) {}

    /**
     * Crea un nuevo departamento en el sistema.
     * @param departamento - DTO con datos del departamento
     * @returns Promise con el departamento creado
     */
    async crear(departamento: DepartamentoDTO): Promise<Departamento> {
        return await this.repositorioDepartamentos.createDepartamento(departamento);
    }
}
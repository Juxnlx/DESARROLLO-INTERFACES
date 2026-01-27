import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { DepartamentoDTO } from "../../dtos/DepartamentoDTO";
import { Departamento } from "../../entities/Departamento";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import type { IActualizarDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IActualizarDepartamentoUseCase";

@injectable()
export class ActualizarDepartamentoUseCase implements IActualizarDepartamentoUseCase {
    
    constructor(
        @inject(TYPES.IDepartamentoRepository) private repositorioDepartamentos: IDepartamentoRepository
    ) {}

    async actualizar(id: number, departamento: DepartamentoDTO): Promise<Departamento> {
        return await this.repositorioDepartamentos.editarDepartamento(id, departamento);
    }
}
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import type { IDepartamentoRepository } from "../../interfaces/repositories/IDepartamentoRepository";
import type { IEliminarDepartamentoUseCase } from "../../interfaces/usecases/departamentos/IEliminarDepartamentoUseCase";

@injectable()
export class EliminarDepartamentoUseCase implements IEliminarDepartamentoUseCase {
    
    constructor(
        @inject(TYPES.IDepartamentoRepository) private repositorioDepartamentos: IDepartamentoRepository
    ) {}

    async eliminar(id: number): Promise<boolean> {
        return await this.repositorioDepartamentos.deleteDepartamento(id);
    }
}
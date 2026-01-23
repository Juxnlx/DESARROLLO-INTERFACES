import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { IEliminarPersonaUseCase } from "../../interfaces/usecases/personas/IEliminarPersonaUseCase";

@injectable()
export class EliminarPersonaUseCase implements IEliminarPersonaUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

    async eliminar(id: number): Promise<boolean> {
        if (this.esDomingo()) {
            throw new Error("No se pueden eliminar personas los domingos");
        }
        
        return await this.repositorioPersonas.eliminarPersona(id);
    }

    private esDomingo(): boolean {
        const diaSemana = new Date().getDay();
        return diaSemana === 0;
    }
}
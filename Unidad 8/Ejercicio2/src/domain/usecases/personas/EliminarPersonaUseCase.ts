import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { IEliminarPersonaUseCase } from "../../interfaces/usecases/personas/IEliminarPersonaUseCase";

/**
 * Caso de uso para eliminar personas.
 * Aplica regla de negocio: no se puede eliminar los domingos.
 */
@injectable()
export class EliminarPersonaUseCase implements IEliminarPersonaUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

    /**
     * Elimina una persona del sistema.
     * Los domingos lanza un error y no permite eliminar.
     * @param id - ID de la persona a eliminar
     * @returns Promise con true si se elimino
     * @throws Error si es domingo
     */
    async eliminar(id: number): Promise<boolean> {
        // Aplicar regla de negocio: no eliminar domingos
        if (this.esDomingo()) {
            throw new Error("No se pueden eliminar personas los domingos");
        }
        
        return await this.repositorioPersonas.deletePersona(id);
    }

    /**
     * Verifica si hoy es domingo (0).
     * @returns true si es domingo
     */
    private esDomingo(): boolean {
        const diaSemana = new Date().getDay();
        return diaSemana === 0;
    }
}
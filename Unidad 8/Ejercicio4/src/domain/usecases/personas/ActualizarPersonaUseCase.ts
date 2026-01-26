import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { PersonaDTO } from "../../dtos/PersonaDTO";
import { Persona } from "../../entities/Persona";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { IActualizarPersonaUseCase } from "../../interfaces/usecases/personas/IActualizarPersonaUseCase";

/**
 * Caso de uso para actualizar personas.
 */
@injectable()
export class ActualizarPersonaUseCase implements IActualizarPersonaUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

    /**
     * Actualiza una persona existente.
     * @param id - ID de la persona a actualizar
     * @param persona - DTO con nuevos datos
     * @returns Promise con la persona actualizada
     */
    async actualizar(id: number, persona: PersonaDTO): Promise<Persona> {
        return await this.repositorioPersonas.editarPersona(id, persona);
    }
}
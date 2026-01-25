import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../core/types";
import { Persona } from "../../entities/Persona";
import { PersonaDTO } from "../../dtos/PersonaDTO";
import type { ICrearPersonaUseCase } from "../../interfaces/usecases/personas/ICrearPersonaUseCase";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";

/**
 * Caso de uso para crear personas.
 */
@injectable()
export class CrearPersonaUseCase implements ICrearPersonaUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

    /**
     * Crea una nueva persona en el sistema.
     * @param persona - DTO con datos de la persona
     * @returns Promise con la persona creada
     */
    async crear(persona: PersonaDTO): Promise<Persona> {
        return await this.repositorioPersonas.createPersona(persona);
    }
}
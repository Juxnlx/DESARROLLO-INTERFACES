import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { PersonaDTO } from "../../dtos/PersonaDTO";
import { Persona } from "../../entities/Persona";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { ICrearPersonaUseCase } from "../../interfaces/usecases/personas/ICrearPersonaUseCase";

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
        return await this.repositorioPersonas.insertarPersona(persona);
    }
}
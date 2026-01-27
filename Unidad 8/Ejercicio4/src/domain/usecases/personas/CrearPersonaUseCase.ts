import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { PersonaDTO } from "../../dtos/PersonaDTO";
import { Persona } from "../../entities/Persona";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { ICrearPersonaUseCase } from "../../interfaces/usecases/personas/ICrearPersonaUseCase";

@injectable()
export class CrearPersonaUseCase implements ICrearPersonaUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

    async crear(persona: PersonaDTO): Promise<Persona> {
        return await this.repositorioPersonas.insertarPersona(persona);
    }
}
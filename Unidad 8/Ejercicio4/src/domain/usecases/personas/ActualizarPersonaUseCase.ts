import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { PersonaDTO } from "../../dtos/PersonaDTO";
import { Persona } from "../../entities/Persona";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { IActualizarPersonaUseCase } from "../../interfaces/usecases/personas/IActualizarPersonaUseCase";

@injectable()
export class ActualizarPersonaUseCase implements IActualizarPersonaUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

    async actualizar(id: number, persona: PersonaDTO): Promise<Persona> {
        return await this.repositorioPersonas.editarPersona(id, persona);
    }
}
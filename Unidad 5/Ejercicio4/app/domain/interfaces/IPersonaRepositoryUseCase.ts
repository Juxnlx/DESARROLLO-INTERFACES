import { Persona } from "../entities/Persona";

export interface IPersonaRepositoryUseCase {
  execute(): Persona[];
}
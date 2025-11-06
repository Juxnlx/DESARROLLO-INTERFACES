import { Persona } from "../entities/Persona";

export interface IPersonaRepository {
  getAllPersons(): Persona[];
}
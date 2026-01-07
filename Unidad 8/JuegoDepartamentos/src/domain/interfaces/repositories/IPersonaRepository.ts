import { Persona } from "../../entities/Persona";

export interface IPersonaRepository {
    getAllPersonas(): Promise<Persona[]>;
    getPersonaById(id: number): Promise<Persona | null>;
}
import { Persona } from "../../entities/Persona";

/**
 * Interfaz que define el contrato para el repositorio de personas.
 * Separa la abstracción de la implementación (Principio de Inversión de Dependencias).
 */
export interface IPersonaRepository {
    getAllPersonas(): Promise<Persona[]>;
    getPersonaById(id: number): Promise<Persona | null>;
}
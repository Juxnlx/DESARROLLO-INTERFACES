import { PersonaConDepartamentosDTO } from "../../dtos/PersonaConDepartamentosDTO";
import { Persona } from "../../entities/Persona";

/**
 * Interfaz que define el contrato para el caso de uso de obtener personas.
 * Define la lógica de negocio para combinar personas con departamentos.
 */
export interface IObtenerPersonasUseCase {
    obtenerPersonasConDepartamentos(): Promise<PersonaConDepartamentosDTO[]>;
    buscarPersonaPorId(idPersona: number): Promise<Persona | null>;
}
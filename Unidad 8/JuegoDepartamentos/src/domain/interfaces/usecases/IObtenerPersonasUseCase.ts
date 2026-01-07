import { PersonaConDepartamentosDTO } from "../../dtos/PersonaConDepartamentosDTO";
import { Persona } from "../../entities/Persona";

export interface IObtenerPersonasUseCase {
    obtenerPersonasConDepartamentos(): Promise<PersonaConDepartamentosDTO[]>;
    buscarPersonaPorId(idPersona: number): Promise<Persona | null>;
}
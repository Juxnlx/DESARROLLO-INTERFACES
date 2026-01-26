import { PersonaDTO } from '../../dtos/PersonaDTO';
import { Persona } from '../../entities/Persona';

export interface IPersonaRepository {
  getAllPersonas(): Promise<Persona[]>;
  getPersonaById(id: number): Promise<Persona | null>;
  insertarPersona(persona: PersonaDTO): Promise<Persona>;  // ← Cambio
  editarPersona(id: number, persona: PersonaDTO): Promise<Persona>;  // ← Cambio
  eliminarPersona(id: number): Promise<boolean>;  // ← Cambio
}
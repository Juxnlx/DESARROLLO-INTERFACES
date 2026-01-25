import { Persona } from '../../entities/Persona';
import { PersonaDTO } from '../../dtos/PersonaDTO';

export interface IPersonaRepository {
  getAllPersonas(): Promise<Persona[]>;
  getPersonaById(id: number): Promise<Persona | null>;
  createPersona(persona: PersonaDTO): Promise<Persona>;
  updatePersona(id: number, persona: PersonaDTO): Promise<Persona>;
  deletePersona(id: number): Promise<boolean>;
}
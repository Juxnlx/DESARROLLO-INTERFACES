import { Persona } from '../../../entities/Persona';
import { PersonaDTO } from '../../../dtos/PersonaDTO';

export interface ICrearPersonaUseCase {
  crear(persona: PersonaDTO): Promise<Persona>;
}
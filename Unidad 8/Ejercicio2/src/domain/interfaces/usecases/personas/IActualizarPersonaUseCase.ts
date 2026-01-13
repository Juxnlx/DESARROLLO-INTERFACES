import { Persona } from '../../../entities/Persona';
import { PersonaDTO } from '../../../dtos/PersonaDTO';

export interface IActualizarPersonaUseCase {
  actualizar(id: number, persona: PersonaDTO): Promise<Persona>;
}
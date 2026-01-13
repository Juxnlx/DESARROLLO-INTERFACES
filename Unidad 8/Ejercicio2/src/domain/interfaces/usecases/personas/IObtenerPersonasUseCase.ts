import { Persona } from '../../../entities/Persona';

export interface IObtenerPersonasUseCase {
  obtenerPersonas(): Promise<Persona[]>;
  obtenerPersonaPorId(id: number): Promise<Persona | null>;
}
import { Persona } from "../../entities/Persona";

export interface IPersonaUseCase {
  getAllPersonas(): Promise<Persona[]>;
  editarPersona(idPersonaEditar: number, persona: Persona): Promise<Persona>;
  insertarPersona(personaNueva: Persona): Promise<Persona>;
  eliminarPersona(idPersonaEliminar: number): Promise<boolean>;
}
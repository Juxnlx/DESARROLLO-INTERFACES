import { Persona } from "../../domain/entities/Persona";

export class PersonaModel {
  id: number;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;

  constructor(person: Persona) {
    this.id = person.getId();
    this.nombre = person.getNombre();
    this.apellidos = person.getApellidos();
    this.fechaNacimiento = person.getFechaNacimiento();
  }
}
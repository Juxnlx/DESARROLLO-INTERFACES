import { Persona } from "../../domain/entities/Persona";

export class PersonaRepositoryEmpty implements IPersonaRepository {
  private persons: Persona[];

  constructor() {
    this.persons = [];
  }

  getAllPersons(): Persona[] {
    return this.persons;
  }
}
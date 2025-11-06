import { Persona } from "../entities/Persona";
import { IPersonaRepositoryUseCase } from "../interfaces/IPersonaRepositoryUseCase";
import { IPersonaRepository } from "../repositories/IPersonaRepository";

export class PersonaRepositoryUseCase implements IPersonaRepositoryUseCase {
  private repository: IPersonaRepository;

  constructor(repository: IPersonaRepository) {
    this.repository = repository;
  }

  execute(): Persona[] {
    const persons = this.repository.getAllPersons();
    if (persons.length === 0) return [];

    const day = new Date().getDay();
    const index = day % persons.length;
    return [persons[index]];
  }
}
import { Persona } from '../Entidades/PersonaModel';

export class RepositoryPersona {
  static getPersonas(): Persona[] {
    return [
      new Persona(1, 'Lucía', 'Fernández Pérez'),
      new Persona(2, 'Carlos', 'Gómez Díaz'),
      new Persona(3, 'Andrea', 'Ruiz Martínez'),
      new Persona(4, 'David', 'Sánchez López'),
      new Persona(5, 'Marina', 'Moreno Ortiz'),
    ];
  }
}


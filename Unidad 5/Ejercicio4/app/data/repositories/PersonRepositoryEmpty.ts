import { Persona } from "../../domain/entities/Persona";
import { IPersonaRepository } from "../../domain/repositories/IPersonaRepository";

export class PersonaRepository100 implements IPersonaRepository {
  private persons: Persona[];

  constructor() {
    this.persons = [
      new Persona(1, "Laura", "Gómez Ruiz", "1992-03-15"),
      new Persona(2, "Carlos", "Fernández López", "1988-07-09"),
      new Persona(3, "María", "Santos Díaz", "1995-01-21"),
      new Persona(4, "Javier", "Romero Pérez", "1990-11-02"),
      new Persona(5, "Lucía", "Herrera Castro", "1993-06-10"),
      new Persona(6, "Andrés", "Morales Vega", "1989-09-30"),
      new Persona(7, "Paula", "Navarro Martín", "1996-12-25"),
      // Puedes seguir agregando hasta 100 personas si lo deseas.
      new Persona(8, "David", "Suárez Torres", "1991-05-12"),
      new Persona(9, "Clara", "Jiménez Soto", "1994-08-18"),
      new Persona(10, "Miguel", "Cano Ortiz", "1997-02-05"),
      new Persona(11, "Elena", "Vargas León", "1990-04-30"),
      new Persona(12, "Sergio", "Lara Gómez", "1987-10-15"),
      new Persona(13, "Raquel", "Marín Cruz", "1993-01-08"),
      new Persona(14, "Diego", "Ortega Ruiz", "1998-06-20"),
      new Persona(15, "Sara", "Prieto Gil", "1991-09-27"),
      new Persona(16, "Adrián", "Delgado Ramos", "1985-12-12"),
      new Persona(17, "Marta", "Campos Núñez", "1992-05-07"),
      new Persona(18, "Rubén", "Castro Molina", "1989-03-23"),
      new Persona(19, "Patricia", "Reyes Ibáñez", "1996-11-19"),
      new Persona(20, "Alejandro", "López Vargas", "1990-07-04")
    ];
  }

  getAllPersons(): Persona[] {
    return this.persons;
  }
}
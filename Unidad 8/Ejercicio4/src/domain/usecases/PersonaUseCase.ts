import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { PersonaDTO } from "../dtos/PersonaDTO";
import { Persona } from "../entities/Persona";
import { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import { IPersonaUseCase } from "../interfaces/usecases/IPersonaUseCase";

@injectable()
export class PersonaUseCase implements IPersonaUseCase {
  private readonly _personaRepository: IPersonaRepository;

  constructor(
    @inject(TYPES.IPersonaRepository) personaRepository: IPersonaRepository
  ) {
    this._personaRepository = personaRepository;
  }

  async getAllPersonas(): Promise<Persona[]> {
    const todasLasPersonas = await this._personaRepository.getAllPersonas();
    const personasFiltradas = this.aplicarLogicaNegocio(todasLasPersonas);
    return personasFiltradas;
  }

  private aplicarLogicaNegocio(personas: Persona[]): Persona[] {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const esViernesOSabado = diaSemana === 5 || diaSemana === 6;
    let resultado: Persona[] = [];

    if (esViernesOSabado) {
      resultado = personas.filter((persona) => {
        if (!persona.fechaNacimiento) {
          //si no tiene fecha, no puede ser mayor de edad
          return false;
        }
        const edad = this.calcularEdad(persona.fechaNacimiento);
        return edad >= 18;
      });
    } else {
      resultado = personas;
    }

    return resultado;
  }

  private calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    const condicionMes = mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate());

    if (condicionMes) {
      edad = edad - 1;
    }

    return edad;
  }

  async editarPersona(idPersonaEditar: number, persona: Persona): Promise<Persona> {
    // Convertir Entidad a DTO
    const dto: PersonaDTO = {
      id: persona.id,
      nombre: persona.nombre,
      apellidos: persona.apellidos,
      telefono: persona.telefono,
      direccion: persona.direccion,
      foto: persona.foto,
      fechaNacimiento: persona.fechaNacimiento.toISOString(),
      idDepartamento: persona.idDepartamento
    };
    
    const resultado = await this._personaRepository.editarPersona(idPersonaEditar, dto);
    return resultado;
  }

  async insertarPersona(personaNueva: Persona): Promise<Persona> {
    // Convertir Entidad a DTO
    const dto: PersonaDTO = {
      id: personaNueva.id,
      nombre: personaNueva.nombre,
      apellidos: personaNueva.apellidos,
      telefono: personaNueva.telefono,
      direccion: personaNueva.direccion,
      foto: personaNueva.foto,
      fechaNacimiento: personaNueva.fechaNacimiento.toISOString(),
      idDepartamento: personaNueva.idDepartamento
    };
    
    const resultado = await this._personaRepository.insertarPersona(dto);
    return resultado;
  }

  async eliminarPersona(idPersonaEliminar: number): Promise<boolean> {
    // Validación de negocio: no eliminar los domingos
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const esDomingo = diaSemana === 0;

    if (esDomingo) {
      throw new Error("No se pueden eliminar personas los domingos");
    }

    const resultado = await this._personaRepository.eliminarPersona(idPersonaEliminar);
    return resultado;
  }
}
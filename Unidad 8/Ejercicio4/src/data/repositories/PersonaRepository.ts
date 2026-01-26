import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../core/types";
import { PersonaDTO } from "../../domain/dtos/PersonaDTO";
import { Persona } from "../../domain/entities/Persona";
import { IPersonaRepository } from "../../domain/interfaces/repositories/IPersonaRepository";
import { AzureAPI } from "../datasource/AzureAPI";

@injectable()
export class PersonaRepository implements IPersonaRepository {
  private readonly _azureAPI: AzureAPI;

  constructor(@inject(TYPES.AzureAPI) azureAPI: AzureAPI) {
    this._azureAPI = azureAPI;
  }

  async getAllPersonas(): Promise<Persona[]> {
    const dtos = await this._azureAPI.obtenerListaPersonas();
    return dtos.map(
      (dto) =>
        new Persona(
          dto.id,
          dto.nombre,
          dto.apellidos,
          dto.telefono,
          dto.direccion,
          dto.foto,
          new Date(dto.fechaNacimiento),
          dto.idDepartamento
        )
    );
  }

  async getPersonaById(id: number): Promise<Persona | null> {
    try {
      const dto = await this._azureAPI.obtenerPersonaPorId(id);
      return new Persona(
        dto.id,
        dto.nombre,
        dto.apellidos,
        dto.telefono,
        dto.direccion,
        dto.foto,
        new Date(dto.fechaNacimiento),
        dto.idDepartamento
      );
    } catch {
      return null;
    }
  }

  async insertarPersona(personaDTO: PersonaDTO): Promise<Persona> {
    await this._azureAPI.crearPersona(personaDTO);
    return new Persona(
      personaDTO.id,
      personaDTO.nombre,
      personaDTO.apellidos,
      personaDTO.telefono,
      personaDTO.direccion,
      personaDTO.foto,
      new Date(personaDTO.fechaNacimiento),
      personaDTO.idDepartamento
    );
  }

  async editarPersona(id: number, personaDTO: PersonaDTO): Promise<Persona> {
    await this._azureAPI.actualizarPersona(id, personaDTO);
    return new Persona(
      personaDTO.id,
      personaDTO.nombre,
      personaDTO.apellidos,
      personaDTO.telefono,
      personaDTO.direccion,
      personaDTO.foto,
      new Date(personaDTO.fechaNacimiento),
      personaDTO.idDepartamento
    );
  }

  async eliminarPersona(id: number): Promise<boolean> {
    try {
      await this._azureAPI.eliminarPersona(id);
      return true;
    } catch {
      return false;
    }
  }
}
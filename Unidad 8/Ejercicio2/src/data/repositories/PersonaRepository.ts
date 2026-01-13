import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import { PersonaDTO } from "../../domain/dtos/PersonaDTO";
import type { IPersonaRepository } from "../../domain/interfaces/repositories/IPersonaRepository";
import { AzureAPI } from "../datasource/AzureAPI";

/**
 * Implementación del repositorio de personas.
 * Transforma datos de la API en entidades del dominio.
 */
@injectable()
export class PersonaRepository implements IPersonaRepository {
    
    constructor(
        @inject(TYPES.AzureAPI) private apiAzure: AzureAPI
    ) {}

    /**
     * Obtiene todas las personas y las transforma en entidades.
     * Convierte la fecha de nacimiento de string a Date.
     * @returns Promise con array de entidades Persona
     */
    async getAllPersonas(): Promise<Persona[]> {
        const datosAPI = await this.apiAzure.obtenerListaPersonas();
        const listaPersonas: Persona[] = [];
        
        for (const item of datosAPI) {
            const persona = new Persona(
                item.id,
                item.nombre,
                item.apellidos,
                item.telefono,
                item.direccion,
                item.foto,
                new Date(item.fechaNacimiento),
                item.idDepartamento
            );
            listaPersonas.push(persona);
        }
        
        return listaPersonas;
    }

    /**
     * Obtiene una persona específica por su ID.
     * @param id - ID de la persona a buscar
     * @returns Promise con entidad Persona o null si no existe
     */
    async getPersonaById(id: number): Promise<Persona | null> {
        const datosAPI = await this.apiAzure.obtenerPersonaPorId(id);
        
        if (!datosAPI) {
            return null;
        }
        
        const persona = new Persona(
            datosAPI.id,
            datosAPI.nombre,
            datosAPI.apellidos,
            datosAPI.telefono,
            datosAPI.direccion,
            datosAPI.foto,
            new Date(datosAPI.fechaNacimiento),
            datosAPI.idDepartamento
        );
        
        return persona;
    }

    /**
     * Crea una nueva persona en el sistema.
     * @param persona - DTO con datos de la persona a crear
     * @returns Promise con entidad Persona creada
     */
    async createPersona(persona: PersonaDTO): Promise<Persona> {
        const personaData = {
            nombre: persona.nombre,
            apellidos: persona.apellidos,
            telefono: persona.telefono,
            direccion: persona.direccion,
            foto: persona.foto,
            fechaNacimiento: persona.fechaNacimiento.toISOString(),
            idDepartamento: persona.idDepartamento,
        };
        
        const datosAPI = await this.apiAzure.crearPersona(personaData);
        
        const nuevaPersona = new Persona(
            datosAPI.id,
            datosAPI.nombre,
            datosAPI.apellidos,
            datosAPI.telefono,
            datosAPI.direccion,
            datosAPI.foto,
            new Date(datosAPI.fechaNacimiento),
            datosAPI.idDepartamento
        );
        
        return nuevaPersona;
    }

    /**
     * Actualiza una persona existente.
     * @param id - ID de la persona a actualizar
     * @param persona - DTO con nuevos datos de la persona
     * @returns Promise con entidad Persona actualizada
     */
    async updatePersona(id: number, persona: PersonaDTO): Promise<Persona> {
        const personaData = {
            nombre: persona.nombre,
            apellidos: persona.apellidos,
            telefono: persona.telefono,
            direccion: persona.direccion,
            foto: persona.foto,
            fechaNacimiento: persona.fechaNacimiento.toISOString(),
            idDepartamento: persona.idDepartamento,
        };
        
        const datosAPI = await this.apiAzure.actualizarPersona(id, personaData);
        
        const personaActualizada = new Persona(
            datosAPI.id,
            datosAPI.nombre,
            datosAPI.apellidos,
            datosAPI.telefono,
            datosAPI.direccion,
            datosAPI.foto,
            new Date(datosAPI.fechaNacimiento),
            datosAPI.idDepartamento
        );
        
        return personaActualizada;
    }

    /**
     * Elimina una persona del sistema.
     * @param id - ID de la persona a eliminar
     * @returns Promise con true si se eliminó correctamente
     */
    async deletePersona(id: number): Promise<boolean> {
        try {
            await this.apiAzure.eliminarPersona(id);
            return true;
        } catch (error) {
            console.error(`Error al eliminar persona ${id}:`, error);
            return false;
        }
    }
}
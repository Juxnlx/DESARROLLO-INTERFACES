import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import type { IPersonaRepository } from "../../domain/interfaces/repositories/IPersonaRepository";
import { AzureAPI } from "../datasource/AzureAPI";

@injectable()
export class PersonaRepository implements IPersonaRepository {
    
    constructor(
        @inject(TYPES.AzureAPI) private apiAzure: AzureAPI
    ) {}

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
}
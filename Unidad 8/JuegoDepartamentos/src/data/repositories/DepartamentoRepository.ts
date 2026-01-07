import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { Departamento } from "../../domain/entities/Departamento";
import type { IDepartamentoRepository } from "../../domain/interfaces/repositories/IDepartamentoRepository";
import { AzureAPI } from "../datasource/AzureAPI";

/**
 * Implementación del repositorio de departamentos.
 * Transforma datos de la API en entidades del dominio.
 */
@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
    
    constructor(
        @inject(TYPES.AzureAPI) private apiAzure: AzureAPI
    ) {}

    /**
     * Obtiene todos los departamentos y los transforma en entidades.
     * @returns Promise con array de entidades Departamento
     */
    async getAllDepartamentos(): Promise<Departamento[]> {
        const datosAPI = await this.apiAzure.obtenerListaDepartamentos();
        const listaDepartamentos: Departamento[] = [];
        
        for (const item of datosAPI) {
            const departamento = new Departamento(item.id, item.nombre);
            listaDepartamentos.push(departamento);
        }
        
        return listaDepartamentos;
    }

    /**
     * Obtiene un departamento específico por su ID.
     * @param id - ID del departamento a buscar
     * @returns Promise con entidad Departamento o null si no existe
     */
    async getDepartamentoById(id: number): Promise<Departamento | null> {
        const datosAPI = await this.apiAzure.obtenerDepartamentoPorId(id);
        
        if (!datosAPI) {
            return null;
        }
        
        const departamento = new Departamento(datosAPI.id, datosAPI.nombre);
        
        return departamento;
    }
}
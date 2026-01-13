import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { Departamento } from "../../domain/entities/Departamento";
import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
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

    /**
     * Crea un nuevo departamento en el sistema.
     * @param departamento - DTO con datos del departamento a crear
     * @returns Promise con entidad Departamento creada
     */
    async createDepartamento(departamento: DepartamentoDTO): Promise<Departamento> {
        const departamentoData = {
            nombre: departamento.nombre,
        };
        
        const datosAPI = await this.apiAzure.crearDepartamento(departamentoData);
        
        const nuevoDepartamento = new Departamento(datosAPI.id, datosAPI.nombre);
        
        return nuevoDepartamento;
    }

    /**
     * Actualiza un departamento existente.
     * @param id - ID del departamento a actualizar
     * @param departamento - DTO con nuevos datos del departamento
     * @returns Promise con entidad Departamento actualizada
     */
    async updateDepartamento(id: number, departamento: DepartamentoDTO): Promise<Departamento> {
        const departamentoData = {
            nombre: departamento.nombre,
        };
        
        const datosAPI = await this.apiAzure.actualizarDepartamento(id, departamentoData);
        
        const departamentoActualizado = new Departamento(datosAPI.id, datosAPI.nombre);
        
        return departamentoActualizado;
    }

    /**
     * Elimina un departamento del sistema.
     * @param id - ID del departamento a eliminar
     * @returns Promise con true si se eliminó correctamente
     */
    async deleteDepartamento(id: number): Promise<boolean> {
        try {
            await this.apiAzure.eliminarDepartamento(id);
            return true;
        } catch (error) {
            console.error(`Error al eliminar departamento ${id}:`, error);
            return false;
        }
    }
}
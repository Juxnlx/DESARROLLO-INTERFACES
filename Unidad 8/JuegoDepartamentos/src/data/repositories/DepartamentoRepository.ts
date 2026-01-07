import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { Departamento } from "../../domain/entities/Departamento";
import type { IDepartamentoRepository } from "../../domain/interfaces/repositories/IDepartamentoRepository";
import { AzureAPI } from "../datasource/AzureAPI";

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
    
    constructor(
        @inject(TYPES.AzureAPI) private apiAzure: AzureAPI
    ) {}

    async getAllDepartamentos(): Promise<Departamento[]> {
        const datosAPI = await this.apiAzure.obtenerListaDepartamentos();
        const listaDepartamentos: Departamento[] = [];
        
        for (const item of datosAPI) {
            const departamento = new Departamento(item.id, item.nombre);
            listaDepartamentos.push(departamento);
        }
        
        return listaDepartamentos;
    }

    async getDepartamentoById(id: number): Promise<Departamento | null> {
        const datosAPI = await this.apiAzure.obtenerDepartamentoPorId(id);
        
        if (!datosAPI) {
            return null;
        }
        
        const departamento = new Departamento(datosAPI.id, datosAPI.nombre);
        
        return departamento;
    }
}
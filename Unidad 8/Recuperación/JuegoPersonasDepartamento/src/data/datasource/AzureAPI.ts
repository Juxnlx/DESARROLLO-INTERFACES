import { injectable } from "inversify";

@injectable()
export class AzureAPI {
    private readonly URL_BASE: string;

    constructor() {
        this.URL_BASE = "https://juanluis-g9hvdhc7azdvgphc.spaincentral-01.azurewebsites.net";
    }

    async obtenerListaPersonas(): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/personas`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al consultar personas: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }

    async obtenerListaDepartamentos(): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/departamentos`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al consultar departamentos: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }

    async obtenerPersonaPorId(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/personas/${id}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al buscar persona ${id}: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }

    async obtenerDepartamentoPorId(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/departamentos/${id}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al buscar departamento ${id}: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }
}
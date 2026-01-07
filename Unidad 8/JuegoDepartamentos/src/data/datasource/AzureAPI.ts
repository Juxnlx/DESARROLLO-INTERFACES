import { injectable } from "inversify";

/**
 * DataSource que conecta con la API REST de Azure.
 * Encapsula todas las peticiones HTTP al backend.
 */
@injectable()
export class AzureAPI {
    private readonly URL_BASE: string;

    constructor() {
        this.URL_BASE = "https://juanluis-g9hvdhc7azdvgphc.spaincentral-01.azurewebsites.net";
    }

    /**
     * Obtiene la lista completa de personas desde la API.
     * @returns Promise con array de objetos JSON de personas
     */
    async obtenerListaPersonas(): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Persona`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al consultar personas: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }

    /**
     * Obtiene la lista completa de departamentos desde la API.
     * @returns Promise con array de objetos JSON de departamentos
     */
    async obtenerListaDepartamentos(): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Departamento`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al consultar departamentos: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }

    /**
     * Obtiene una persona específica por su ID.
     * @param id - ID de la persona a buscar
     * @returns Promise con objeto JSON de la persona
     */
    async obtenerPersonaPorId(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Persona/${id}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al buscar persona ${id}: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }

    /**
     * Obtiene un departamento específico por su ID.
     * @param id - ID del departamento a buscar
     * @returns Promise con objeto JSON del departamento
     */
    async obtenerDepartamentoPorId(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Departamento/${id}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP al buscar departamento ${id}: ${respuesta.status}`);
        }
        
        return respuesta.json();
    }
}
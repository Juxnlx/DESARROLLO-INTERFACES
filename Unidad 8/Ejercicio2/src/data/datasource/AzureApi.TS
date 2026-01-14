import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class AzureAPI {
    private readonly URL_BASE: string;

    constructor() {
        this.URL_BASE = "https://juanluis-g9hvdhc7azdvgphc.spaincentral-01.azurewebsites.net";
    }

    async obtenerListaPersonas(): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Persona`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async obtenerPersonaPorId(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Persona/${id}`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async crearPersona(persona: any): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Persona`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(persona),
        });
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async actualizarPersona(id: number, persona: any): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Persona/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(persona),
        });
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async eliminarPersona(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Persona/${id}`, {
            method: "DELETE",
        });
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.status === 204 ? true : respuesta.json();
    }

    async obtenerListaDepartamentos(): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Departamento`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async obtenerDepartamentoPorId(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Departamento/${id}`);
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async crearDepartamento(departamento: any): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Departamento`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(departamento),
        });
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async actualizarDepartamento(id: number, departamento: any): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Departamento/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(departamento),
        });
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.json();
    }

    async eliminarDepartamento(id: number): Promise<any> {
        const respuesta = await fetch(`${this.URL_BASE}/api/Departamento/${id}`, {
            method: "DELETE",
        });
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        return respuesta.status === 204 ? true : respuesta.json();
    }
}
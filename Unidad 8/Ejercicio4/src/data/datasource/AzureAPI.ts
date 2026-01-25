import { injectable } from "inversify";
import "reflect-metadata";
import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
import { PersonaDTO } from "../../domain/dtos/PersonaDTO";

@injectable()
export class AzureAPI {
  private baseURL: string = "https://juanluis-g9hvdhc7azdvgphc.spaincentral-01.azurewebsites.net";

  // ==================== PERSONAS ====================
  
  async obtenerListaPersonas(): Promise<PersonaDTO[]> {
    const response = await fetch(`${this.baseURL}/api/Persona`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async obtenerPersonaPorId(id: number): Promise<PersonaDTO> {
    const response = await fetch(`${this.baseURL}/api/Persona/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async crearPersona(persona: PersonaDTO): Promise<number> {
    const response = await fetch(`${this.baseURL}/api/Persona`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(persona),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  }

  async actualizarPersona(id: number, persona: PersonaDTO): Promise<number> {
    const response = await fetch(`${this.baseURL}/api/Persona/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(persona),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  }

  async eliminarPersona(id: number): Promise<number> {
    const response = await fetch(`${this.baseURL}/api/Persona/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  }

  // ==================== DEPARTAMENTOS ====================
  
  async obtenerListaDepartamentos(): Promise<DepartamentoDTO[]> {
    const response = await fetch(`${this.baseURL}/api/Departamento`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async obtenerDepartamentoPorId(id: number): Promise<DepartamentoDTO> {
    const response = await fetch(`${this.baseURL}/api/Departamento/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async crearDepartamento(departamento: DepartamentoDTO): Promise<number> {
    const response = await fetch(`${this.baseURL}/api/Departamento`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(departamento),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  }

  async actualizarDepartamento(id: number, departamento: DepartamentoDTO): Promise<number> {
    const response = await fetch(`${this.baseURL}/api/Departamento/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(departamento),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  }

  async eliminarDepartamento(id: number): Promise<number> {
    const response = await fetch(`${this.baseURL}/api/Departamento/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status;
  }
}
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { Persona } from "../../entities/Persona";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { IObtenerPersonasUseCase } from "../../interfaces/usecases/personas/IObtenerPersonasUseCase";

/**
 * Caso de uso para obtener personas.
 * Aplica regla de negocio: viernes y sabados solo muestra mayores de 18.
 */
@injectable()
export class ObtenerPersonasUseCase implements IObtenerPersonasUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

    /**
     * Obtiene todas las personas.
     * Los viernes y sabados filtra solo mayores de 18 anos.
     * @returns Promise con array de personas (filtrado si aplica)
     */
    async obtenerPersonas(): Promise<Persona[]> {
        const todasLasPersonas = await this.repositorioPersonas.getAllPersonas();
        
        // Aplicar regla de negocio: viernes o sabado
        if (this.esViernesOSabado()) {
            return todasLasPersonas.filter(persona => {
                const edad = this.calcularEdad(persona.fechaNacimiento);
                return edad >= 18;
            });
        }
        
        return todasLasPersonas;
    }

    /**
     * Obtiene una persona especifica por ID.
     * @param id - ID de la persona
     * @returns Promise con la persona o null
     */
    async obtenerPersonaPorId(id: number): Promise<Persona | null> {
        return await this.repositorioPersonas.getPersonaById(id);
    }

    /**
     * Calcula la edad a partir de la fecha de nacimiento.
     * @param fechaNacimiento - Fecha de nacimiento
     * @returns Edad en anos
     */
    private calcularEdad(fechaNacimiento: Date): number {
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        
        return edad;
    }

    /**
     * Verifica si hoy es viernes (5) o ssbado (6).
     * @returns true si es viernes o ssbado
     */
    private esViernesOSabado(): boolean {
        const diaSemana = new Date().getDay();
        return diaSemana === 5 || diaSemana === 6;
    }
}
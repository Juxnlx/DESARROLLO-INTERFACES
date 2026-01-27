import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../core/types";
import { Persona } from "../../entities/Persona";
import type { IPersonaRepository } from "../../interfaces/repositories/IPersonaRepository";
import type { IObtenerPersonasUseCase } from "../../interfaces/usecases/personas/IObtenerPersonasUseCase";

@injectable()
export class ObtenerPersonasUseCase implements IObtenerPersonasUseCase {
    
    constructor(
        @inject(TYPES.IPersonaRepository) private repositorioPersonas: IPersonaRepository
    ) {}

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

    async obtenerPersonaPorId(id: number): Promise<Persona | null> {
        return await this.repositorioPersonas.getPersonaById(id);
    }

    private calcularEdad(fechaNacimiento: Date): number {
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        
        return edad;
    }

    private esViernesOSabado(): boolean {
        const diaSemana = new Date().getDay();
        return diaSemana === 5 || diaSemana === 6;
    }
}
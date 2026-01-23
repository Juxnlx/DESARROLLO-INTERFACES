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
        
        const hoy = new Date();
        const diaSemana = hoy.getDay();
        const esViernesOSabado = diaSemana === 5 || diaSemana === 6;
        
        if (esViernesOSabado) {
            return todasLasPersonas.filter(persona => {
                const edad = this.calcularEdad(persona.fechaNacimiento, hoy);
                return edad >= 18;
            });
        }
        
        return todasLasPersonas;
    }

    async obtenerPersonaPorId(id: number): Promise<Persona | null> {
        return await this.repositorioPersonas.getPersonaById(id);
    }

    private calcularEdad(fechaNacimiento: Date, fechaActual: Date): number {
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
        
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }
        
        return edad;
    }
}
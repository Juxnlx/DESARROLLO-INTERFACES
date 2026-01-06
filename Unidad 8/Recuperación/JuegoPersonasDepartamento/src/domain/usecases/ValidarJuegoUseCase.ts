import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { PersonaConDepartamentosDTO } from "../dtos/PersonaConDepartamentosDTO";
import type { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import type { IValidarJuegoUseCase } from "../interfaces/usecases/IValidarJuegoUseCase";

@injectable()
export class ValidarJuegoUseCase implements IValidarJuegoUseCase {
    private repositorioPersonas: IPersonaRepository;

    constructor(
        @inject(TYPES.IPersonaRepository) repositorioPersonas: IPersonaRepository
    ) {
        this.repositorioPersonas = repositorioPersonas;
    }

    async calcularAciertos(respuestasUsuario: PersonaConDepartamentosDTO[]): Promise<number> {
        const personasReales = await this.repositorioPersonas.getAllPersonas();
        
        let contadorAciertos = 0;
        let posicion = 0;
        
        for (const respuesta of respuestasUsuario) {
            const personaReal = personasReales[posicion];
            
            if (personaReal && respuesta.idDepartamentoSeleccionado === personaReal.idDepartamento) {
                contadorAciertos = contadorAciertos + 1;
            }
            
            posicion = posicion + 1;
        }
        
        return contadorAciertos;
    }
}
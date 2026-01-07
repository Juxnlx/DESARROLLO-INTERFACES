import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { PersonaConDepartamentosDTO } from "../dtos/PersonaConDepartamentosDTO";
import type { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import type { IValidarJuegoUseCase } from "../interfaces/usecases/IValidarJuegoUseCase";

/**
 * Caso de uso que valida las respuestas del usuario en el juego.
 * Compara la selección del usuario con el departamento real.
 */
@injectable()
export class ValidarJuegoUseCase implements IValidarJuegoUseCase {
    private repositorioPersonas: IPersonaRepository;

    constructor(
        @inject(TYPES.IPersonaRepository) repositorioPersonas: IPersonaRepository
    ) {
        this.repositorioPersonas = repositorioPersonas;
    }

    /**
     * Calcula el número de aciertos comparando selecciones con departamentos reales.
     * Incluye logs de debug para verificar la validación.
     * @param respuestasUsuario - Array con las respuestas del usuario
     * @returns Promise con el número de aciertos
     */
    async calcularAciertos(respuestasUsuario: PersonaConDepartamentosDTO[]): Promise<number> {
        const personasReales = await this.repositorioPersonas.getAllPersonas();
        
        let contadorAciertos = 0;
        
        console.log('===== VALIDACIÓN =====');
        console.log('Total personas:', respuestasUsuario.length);
        
        for (let i = 0; i < respuestasUsuario.length; i++) {
            const respuesta = respuestasUsuario[i];
            const personaReal = personasReales[i];
            
            console.log(`\nPersona ${i + 1}: ${respuesta.nombrePersona}`);
            console.log('  ID Real:', respuesta.idDepartamentoReal);
            console.log('  ID Seleccionado:', respuesta.idDepartamentoSeleccionado);
            console.log('  ¿Coincide?:', respuesta.idDepartamentoSeleccionado === respuesta.idDepartamentoReal);
            
            if (respuesta.idDepartamentoSeleccionado === respuesta.idDepartamentoReal) {
                contadorAciertos = contadorAciertos + 1;
                console.log('  ✅ ACIERTO');
            } else {
                console.log('  ❌ FALLO');
            }
        }
        
        console.log('\n===== RESULTADO =====');
        console.log('Aciertos totales:', contadorAciertos);
        
        return contadorAciertos;
    }
}
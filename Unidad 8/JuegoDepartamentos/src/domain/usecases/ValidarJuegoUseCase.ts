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
    
    for (let i = 0; i < respuestasUsuario.length; i++) {
        const respuesta = respuestasUsuario[i];
        const personaReal = personasReales[i];
        
        // El departamento real está en la posición [0] de la lista
        const idDepartamentoReal = respuesta.listaDepartamentos[0]?.id || 0;
        const idSeleccionado = respuesta.idDepartamentoSeleccionado;
        
        // DEBUG: Ver qué está pasando
        console.log('===================');
        console.log(`Persona: ${respuesta.nombrePersona} ${respuesta.apellidosPersona}`);
        console.log(`ID Departamento Real: ${idDepartamentoReal}`);
        console.log(`ID Departamento Seleccionado: ${idSeleccionado}`);
        console.log(`¿Son iguales?: ${idSeleccionado === idDepartamentoReal}`);
        console.log(`Tipo Real: ${typeof idDepartamentoReal}, Tipo Seleccionado: ${typeof idSeleccionado}`);
        
        // Comparar la selección del usuario con el departamento real
        if (idSeleccionado === idDepartamentoReal) {
            contadorAciertos = contadorAciertos + 1;
            console.log('✅ ACIERTO!');
        } else {
            console.log('❌ FALLO');
        }
    }
    
    console.log('===================');
    console.log(`TOTAL ACIERTOS: ${contadorAciertos}`);
    
    return contadorAciertos;
}
}
import { PersonaConDepartamentosDTO } from "../../dtos/PersonaConDepartamentosDTO";

/**
 * Interfaz que define el contrato para el caso de uso de validación del juego.
 * Define la lógica de negocio para calcular aciertos.
 */
export interface IValidarJuegoUseCase {
    calcularAciertos(respuestasUsuario: PersonaConDepartamentosDTO[]): Promise<number>;
}
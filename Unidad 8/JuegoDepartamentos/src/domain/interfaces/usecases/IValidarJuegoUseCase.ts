import { PersonaConDepartamentosDTO } from "../../dtos/PersonaConDepartamentosDTO";

export interface IValidarJuegoUseCase {
    calcularAciertos(respuestasUsuario: PersonaConDepartamentosDTO[]): Promise<number>;
}
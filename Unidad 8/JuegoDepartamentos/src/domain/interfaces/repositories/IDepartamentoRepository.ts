import { Departamento } from "../../entities/Departamento";

/**
 * Interfaz que define el contrato para el repositorio de departamentos.
 * Separa la abstracción de la implementación (Principio de Inversión de Dependencias).
 */
export interface IDepartamentoRepository {
    getAllDepartamentos(): Promise<Departamento[]>;
    getDepartamentoById(id: number): Promise<Departamento | null>;
}
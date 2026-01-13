import { Departamento } from '../../../entities/Departamento';

export interface IObtenerDepartamentosUseCase {
  obtenerDepartamentos(): Promise<Departamento[]>;
  obtenerDepartamentoPorId(id: number): Promise<Departamento | null>;
}
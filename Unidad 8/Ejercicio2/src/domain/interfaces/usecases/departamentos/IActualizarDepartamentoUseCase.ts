import { Departamento } from '../../../entities/Departamento';
import { DepartamentoDTO } from '../../../dtos/DepartamentoDTO';

export interface IActualizarDepartamentoUseCase {
  actualizar(id: number, departamento: DepartamentoDTO): Promise<Departamento>;
}
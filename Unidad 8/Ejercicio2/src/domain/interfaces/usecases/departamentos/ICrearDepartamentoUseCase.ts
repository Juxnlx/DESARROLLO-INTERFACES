import { Departamento } from '../../../entities/Departamento';
import { DepartamentoDTO } from '../../../dtos/DepartamentoDTO';

export interface ICrearDepartamentoUseCase {
  crear(departamento: DepartamentoDTO): Promise<Departamento>;
}
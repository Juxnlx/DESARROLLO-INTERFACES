import { Departamento } from '../../entities/Departamento';
import { DepartamentoDTO } from '../../dtos/DepartamentoDTO';

export interface IDepartamentoRepository {
  getAllDepartamentos(): Promise<Departamento[]>;
  getDepartamentoById(id: number): Promise<Departamento | null>;
  createDepartamento(departamento: DepartamentoDTO): Promise<Departamento>;
  updateDepartamento(id: number, departamento: DepartamentoDTO): Promise<Departamento>;
  deleteDepartamento(id: number): Promise<boolean>;
}
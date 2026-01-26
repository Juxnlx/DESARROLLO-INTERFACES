import { DepartamentoDTO } from '../../dtos/DepartamentoDTO';
import { Departamento } from '../../entities/Departamento';

export interface IDepartamentoRepository {
  getAllDepartamentos(): Promise<Departamento[]>;
  getDepartamentoById(id: number): Promise<Departamento | null>;
  insertarDepartamento(departamento: DepartamentoDTO): Promise<Departamento>;  // ← Cambio
  editarDepartamento(id: number, departamento: DepartamentoDTO): Promise<Departamento>;  // ← Cambio
  deleteDepartamento(id: number): Promise<boolean>;
}
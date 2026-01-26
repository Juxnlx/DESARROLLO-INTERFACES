import { Departamento } from "../../entities/Departamento";

export interface IDepartamentoUseCase {
  getAllDepartamentos(): Promise<Departamento[]>;
  editarDepartamento(idDepartamentoEditar: number, departamento: Departamento): Promise<Departamento>;
  insertarDepartamento(departamentoNuevo: Departamento): Promise<Departamento>;
  eliminarDepartamento(idDepartamentoEliminar: number): Promise<boolean>;
}
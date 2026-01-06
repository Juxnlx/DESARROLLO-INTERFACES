import { Departamento } from "../../entities/Departamento";

export interface IDepartamentoRepository {
    getAllDepartamentos(): Promise<Departamento[]>;
    getDepartamentoById(id: number): Promise<Departamento | null>;
}
export interface IEliminarDepartamentoUseCase {
  eliminar(id: number): Promise<boolean>;
}
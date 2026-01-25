export interface IEliminarPersonaUseCase {
  eliminar(id: number): Promise<boolean>;
}
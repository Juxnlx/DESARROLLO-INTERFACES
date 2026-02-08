/**
 * Constantes que representan los tipos para Inversify.
 * Se usan como identificadores únicos para la inyección de dependencias.
 */
const TYPES = {
  /** Identificador para la interfaz IRepositoryPartida */
  IRepositoryPartida: Symbol.for("IRepositoryPartida"),

  /** Identificador para la interfaz IUseCasePartida */
  IUseCasePartida: Symbol.for("IUseCasePartida"),
};

export { TYPES };

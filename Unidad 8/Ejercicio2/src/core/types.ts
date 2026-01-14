export const TYPES = {
  // DataSources
  AzureAPI: Symbol.for("AzureAPI"),

  // Repositories
  IPersonaRepository: Symbol.for("IPersonaRepository"),
  IDepartamentoRepository: Symbol.for("IDepartamentoRepository"),

  // UseCases
  IObtenerPersonasUseCase: Symbol.for("IObtenerPersonasUseCase"),
  ICrearPersonaUseCase: Symbol.for("ICrearPersonaUseCase"),
  IActualizarPersonaUseCase: Symbol.for("IActualizarPersonaUseCase"),
  IEliminarPersonaUseCase: Symbol.for("IEliminarPersonaUseCase"),
  IObtenerDepartamentosUseCase: Symbol.for("IObtenerDepartamentosUseCase"),
  ICrearDepartamentoUseCase: Symbol.for("ICrearDepartamentoUseCase"),
  IActualizarDepartamentoUseCase: Symbol.for("IActualizarDepartamentoUseCase"),
  IEliminarDepartamentoUseCase: Symbol.for("IEliminarDepartamentoUseCase"),

  // ViewModels
  PersonaViewModel: Symbol.for("PersonaViewModel"),
  DepartamentoViewModel: Symbol.for("DepartamentoViewModel"),
};
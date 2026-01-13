const TYPES = {
  // Datasources
  AzureAPI: Symbol.for('AzureAPI'),

  // Repositories
  IPersonaRepository: Symbol.for('IPersonaRepository'),
  IDepartamentoRepository: Symbol.for('IDepartamentoRepository'),

  // UseCases - Personas
  IObtenerPersonasUseCase: Symbol.for('IObtenerPersonasUseCase'),
  ICrearPersonaUseCase: Symbol.for('ICrearPersonaUseCase'),
  IActualizarPersonaUseCase: Symbol.for('IActualizarPersonaUseCase'),
  IEliminarPersonaUseCase: Symbol.for('IEliminarPersonaUseCase'),

  // UseCases - Departamentos
  IObtenerDepartamentosUseCase: Symbol.for('IObtenerDepartamentosUseCase'),
  ICrearDepartamentoUseCase: Symbol.for('ICrearDepartamentoUseCase'),
  IActualizarDepartamentoUseCase: Symbol.for('IActualizarDepartamentoUseCase'),
  IEliminarDepartamentoUseCase: Symbol.for('IEliminarDepartamentoUseCase'),

  // ViewModels
  PersonasVM: Symbol.for('PersonasVM'),
  DepartamentosVM: Symbol.for('DepartamentosVM'),
};

export default TYPES;
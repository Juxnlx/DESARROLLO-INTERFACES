import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

// Imports de data
import { AzureAPI } from "../data/datasource/AzureAPI";
import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";
import { PersonaRepository } from "../data/repositories/PersonaRepository";

// Imports de los casos de uso de Persona
import { ActualizarPersonaUseCase } from "../domain/usecases/personas/ActualizarPersonaUseCase";
import { CrearPersonaUseCase } from "../domain/usecases/personas/CrearPersonaUseCase";
import { EliminarPersonaUseCase } from "../domain/usecases/personas/EliminarPersonaUseCase";
import { ObtenerPersonasUseCase } from "../domain/usecases/personas/ObtenerPersonasUseCase";

// Imports de los casos de uso de Departamentos
import { ActualizarDepartamentoUseCase } from "../domain/usecases/departamentos/ActualizarDepartamentoUseCase";
import { CrearDepartamentoUseCase } from "../domain/usecases/departamentos/CrearDepartamentoUseCase";
import { EliminarDepartamentoUseCase } from "../domain/usecases/departamentos/EliminarDepartamentoUseCase";
import { ObtenerDepartamentosUseCase } from "../domain/usecases/departamentos/ObtenerDepartamentoUseCase";

// Imports de view models
import { DepartamentosVM } from "../presenter/viewmodels/DepartamentosVM";
import { PersonasVM } from "../presenter/viewmodels/PersonasVM";

const container = new Container();

container.bind(TYPES.AzureAPI).to(AzureAPI).inSingletonScope();

container.bind(TYPES.IPersonaRepository).to(PersonaRepository).inTransientScope();
container.bind(TYPES.IDepartamentoRepository).to(DepartamentoRepository).inTransientScope();

container.bind(TYPES.IObtenerPersonasUseCase).to(ObtenerPersonasUseCase).inTransientScope();
container.bind(TYPES.ICrearPersonaUseCase).to(CrearPersonaUseCase).inTransientScope();
container.bind(TYPES.IActualizarPersonaUseCase).to(ActualizarPersonaUseCase).inTransientScope();
container.bind(TYPES.IEliminarPersonaUseCase).to(EliminarPersonaUseCase).inTransientScope();

container.bind(TYPES.IObtenerDepartamentosUseCase).to(ObtenerDepartamentosUseCase).inTransientScope();
container.bind(TYPES.ICrearDepartamentoUseCase).to(CrearDepartamentoUseCase).inTransientScope();
container.bind(TYPES.IActualizarDepartamentoUseCase).to(ActualizarDepartamentoUseCase).inTransientScope();
container.bind(TYPES.IEliminarDepartamentoUseCase).to(EliminarDepartamentoUseCase).inTransientScope();

container.bind(TYPES.PersonaViewModel).to(PersonasVM).inSingletonScope();
container.bind(TYPES.DepartamentoViewModel).to(DepartamentosVM).inSingletonScope();

export { container };


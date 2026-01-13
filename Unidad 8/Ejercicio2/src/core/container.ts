import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";

// ==================== DATA ====================
import { AzureAPI } from "../data/datasource/AzureAPI";
import { PersonaRepository } from "../data/repositories/PersonaRepository";
import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";

// ==================== DOMAIN - Interfaces ====================
import type { IPersonaRepository } from "../domain/interfaces/repositories/IPersonaRepository";
import type { IDepartamentoRepository } from "../domain/interfaces/repositories/IDepartamentoRepository";

// UseCases - Personas
import type { IObtenerPersonasUseCase } from "../domain/interfaces/usecases/personas/IObtenerPersonasUseCase";
import type { ICrearPersonaUseCase } from "../domain/interfaces/usecases/personas/ICrearPersonaUseCase";
import type { IActualizarPersonaUseCase } from "../domain/interfaces/usecases/personas/IActualizarPersonaUseCase";
import type { IEliminarPersonaUseCase } from "../domain/interfaces/usecases/personas/IEliminarPersonaUseCase";

// UseCases - Departamentos
import type { IObtenerDepartamentosUseCase } from "../domain/interfaces/usecases/departamentos/IObtenerDepartamentoUseCase";
import type { ICrearDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/ICrearDepartamentoUseCase";
import type { IActualizarDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/IActualizarDepartamentoUseCase";
import type { IEliminarDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/IEliminarDepartamentoUseCase";

// ==================== DOMAIN - Implementaciones ====================
// UseCases - Personas
import { ObtenerPersonasUseCase } from "../domain/usecases/personas/ObtenerPersonasUseCase";
import { CrearPersonaUseCase } from "../domain/usecases/personas/CrearPersonaUseCase";
import { ActualizarPersonaUseCase } from "../domain/usecases/personas/ActualizarPersonaUseCase";
import { EliminarPersonaUseCase } from "../domain/usecases/personas/EliminarPersonaUseCase";

// UseCases - Departamentos
import { ObtenerDepartamentosUseCase } from "../domain/usecases/departamentos/ObtenerDepartamentoUseCase";
import { CrearDepartamentoUseCase } from "../domain/usecases/departamentos/CrearDepartamentoUseCase";
import { ActualizarDepartamentoUseCase } from "../domain/usecases/departamentos/ActualizarDepartamentoUseCase";
import { EliminarDepartamentoUseCase } from "../domain/usecases/departamentos/EliminarDepartamentoUseCase";

// ==================== PRESENTER ====================
import { PersonasVM } from "../presenter/viewmodels/PersonasVM";
import { DepartamentosVM } from "../presenter/viewmodels/DepartamentosVM";

/**
 * Contenedor de Inversify.
 * Configura todas las dependencias del proyecto.
 */
const container = new Container();

// ==================== DATASOURCES ====================
container.bind<AzureAPI>(TYPES.AzureAPI).to(AzureAPI).inSingletonScope();

// ==================== REPOSITORIES ====================
container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepository).inSingletonScope();
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepository).inSingletonScope();

// ==================== USE CASES - PERSONAS ====================
container.bind<IObtenerPersonasUseCase>(TYPES.IObtenerPersonasUseCase).to(ObtenerPersonasUseCase).inTransientScope();
container.bind<ICrearPersonaUseCase>(TYPES.ICrearPersonaUseCase).to(CrearPersonaUseCase).inTransientScope();
container.bind<IActualizarPersonaUseCase>(TYPES.IActualizarPersonaUseCase).to(ActualizarPersonaUseCase).inTransientScope();
container.bind<IEliminarPersonaUseCase>(TYPES.IEliminarPersonaUseCase).to(EliminarPersonaUseCase).inTransientScope();

// ==================== USE CASES - DEPARTAMENTOS ====================
container.bind<IObtenerDepartamentosUseCase>(TYPES.IObtenerDepartamentosUseCase).to(ObtenerDepartamentosUseCase).inTransientScope();
container.bind<ICrearDepartamentoUseCase>(TYPES.ICrearDepartamentoUseCase).to(CrearDepartamentoUseCase).inTransientScope();
container.bind<IActualizarDepartamentoUseCase>(TYPES.IActualizarDepartamentoUseCase).to(ActualizarDepartamentoUseCase).inTransientScope();
container.bind<IEliminarDepartamentoUseCase>(TYPES.IEliminarDepartamentoUseCase).to(EliminarDepartamentoUseCase).inTransientScope();

// ==================== VIEW MODELS ====================
container.bind<PersonasVM>(TYPES.PersonasVM).to(PersonasVM).inSingletonScope();
container.bind<DepartamentosVM>(TYPES.DepartamentosVM).to(DepartamentosVM).inSingletonScope();

export { container };
import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

// ==================== DATA ====================
import { AzureAPI } from "../data/datasource/AzureAPI";
import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";
import { PersonaRepository } from "../data/repositories/PersonaRepository";

// ==================== DOMAIN - Interfaces ====================
import type { IDepartamentoRepository } from "../domain/interfaces/repositories/IDepartamentoRepository";
import type { IPersonaRepository } from "../domain/interfaces/repositories/IPersonaRepository";

// UseCases - Personas
import type { IActualizarPersonaUseCase } from "../domain/interfaces/usecases/personas/IActualizarPersonaUseCase";
import type { ICrearPersonaUseCase } from "../domain/interfaces/usecases/personas/ICrearPersonaUseCase";
import type { IEliminarPersonaUseCase } from "../domain/interfaces/usecases/personas/IEliminarPersonaUseCase";
import type { IObtenerPersonasUseCase } from "../domain/interfaces/usecases/personas/IObtenerPersonasUseCase";

// UseCases - Departamentos
import type { IActualizarDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/IActualizarDepartamentoUseCase";
import type { ICrearDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/ICrearDepartamentoUseCase";
import type { IEliminarDepartamentoUseCase } from "../domain/interfaces/usecases/departamentos/IEliminarDepartamentoUseCase";
import type { IObtenerDepartamentosUseCase } from "../domain/interfaces/usecases/departamentos/IObtenerDepartamentoUseCase";

// ==================== DOMAIN - Implementaciones ====================
// UseCases - Personas
import { ActualizarPersonaUseCase } from "../domain/usecases/personas/ActualizarPersonaUseCase";
import { CrearPersonaUseCase } from "../domain/usecases/personas/CrearPersonaUseCase";
import { EliminarPersonaUseCase } from "../domain/usecases/personas/EliminarPersonaUseCase";
import { ObtenerPersonasUseCase } from "../domain/usecases/personas/ObtenerPersonasUseCase";

// UseCases - Departamentos
import { ActualizarDepartamentoUseCase } from "../domain/usecases/departamentos/ActualizarDepartamentoUseCase";
import { CrearDepartamentoUseCase } from "../domain/usecases/departamentos/CrearDepartamentoUseCase";
import { EliminarDepartamentoUseCase } from "../domain/usecases/departamentos/EliminarDepartamentoUseCase";
import { ObtenerDepartamentosUseCase } from "../domain/usecases/departamentos/ObtenerDepartamentoUseCase";

// ==================== PRESENTER ====================
import { DepartamentosVM } from "../presenter/viewmodels/DepartamentosVM";
import { PersonasVM } from "../presenter/viewmodels/PersonasVM";

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


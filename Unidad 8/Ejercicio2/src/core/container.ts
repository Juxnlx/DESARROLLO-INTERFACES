import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

// ==================== DATA ====================
import { AzureAPI } from "../data/datasource/AzureAPI";
import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";
import { PersonaRepository } from "../data/repositories/PersonaRepository";

// ==================== DOMAIN - Interfaces ====================

// UseCases - Personas

// UseCases - Departamentos

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

const container = new Container();

// ==================== DATASOURCES ====================
container.bind(TYPES.AzureAPI).to(AzureAPI).inSingletonScope();

// ==================== REPOSITORIES ====================
container.bind(TYPES.IPersonaRepository).to(PersonaRepository);
container.bind(TYPES.IDepartamentoRepository).to(DepartamentoRepository);

// ==================== USE CASES - PERSONAS ====================
container.bind(TYPES.IObtenerPersonasUseCase).to(ObtenerPersonasUseCase);
container.bind(TYPES.ICrearPersonaUseCase).to(CrearPersonaUseCase);
container.bind(TYPES.IActualizarPersonaUseCase).to(ActualizarPersonaUseCase);
container.bind(TYPES.IEliminarPersonaUseCase).to(EliminarPersonaUseCase);

// ==================== USE CASES - DEPARTAMENTOS ====================
container.bind(TYPES.IObtenerDepartamentosUseCase).to(ObtenerDepartamentosUseCase);
container.bind(TYPES.ICrearDepartamentoUseCase).to(CrearDepartamentoUseCase);
container.bind(TYPES.IActualizarDepartamentoUseCase).to(ActualizarDepartamentoUseCase);
container.bind(TYPES.IEliminarDepartamentoUseCase).to(EliminarDepartamentoUseCase);

// ==================== VIEW MODELS ====================
container.bind(TYPES.PersonaViewModel).to(PersonasVM).inSingletonScope();
container.bind(TYPES.DepartamentoViewModel).to(DepartamentosVM).inSingletonScope();

export { container };

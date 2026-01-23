import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

import { AzureAPI } from "../data/datasource/AzureAPI";
import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";
import { PersonaRepository } from "../data/repositories/PersonaRepository";

import { ActualizarPersonaUseCase } from "../domain/usecases/personas/ActualizarPersonaUseCase";
import { CrearPersonaUseCase } from "../domain/usecases/personas/CrearPersonaUseCase";
import { EliminarPersonaUseCase } from "../domain/usecases/personas/EliminarPersonaUseCase";
import { ObtenerPersonasUseCase } from "../domain/usecases/personas/ObtenerPersonasUseCase";

import { ActualizarDepartamentoUseCase } from "../domain/usecases/departamentos/ActualizarDepartamentoUseCase";
import { CrearDepartamentoUseCase } from "../domain/usecases/departamentos/CrearDepartamentoUseCase";
import { EliminarDepartamentoUseCase } from "../domain/usecases/departamentos/EliminarDepartamentoUseCase";
import { ObtenerDepartamentosUseCase } from "../domain/usecases/departamentos/ObtenerDepartamentoUseCase";

import { DepartamentosVM } from "../presenter/viewmodels/DepartamentosVM";
import { PersonasVM } from "../presenter/viewmodels/PersonasVM";

const container = new Container();

// Singleton para la API (una sola instancia)
container.bind(TYPES.AzureAPI).to(AzureAPI).inSingletonScope();

// Transient para repositorios (nueva instancia cada vez)
container.bind(TYPES.IPersonaRepository).to(PersonaRepository).inTransientScope();
container.bind(TYPES.IDepartamentoRepository).to(DepartamentoRepository).inTransientScope();

// Transient para UseCases (IMPORTANTE: nueva instancia cada vez para recalcular fechas)
container.bind(TYPES.IObtenerPersonasUseCase).to(ObtenerPersonasUseCase).inTransientScope();
container.bind(TYPES.ICrearPersonaUseCase).to(CrearPersonaUseCase).inTransientScope();
container.bind(TYPES.IActualizarPersonaUseCase).to(ActualizarPersonaUseCase).inTransientScope();
container.bind(TYPES.IEliminarPersonaUseCase).to(EliminarPersonaUseCase).inTransientScope();

container.bind(TYPES.IObtenerDepartamentosUseCase).to(ObtenerDepartamentosUseCase).inTransientScope();
container.bind(TYPES.ICrearDepartamentoUseCase).to(CrearDepartamentoUseCase).inTransientScope();
container.bind(TYPES.IActualizarDepartamentoUseCase).to(ActualizarDepartamentoUseCase).inTransientScope();
container.bind(TYPES.IEliminarDepartamentoUseCase).to(EliminarDepartamentoUseCase).inTransientScope();

// Singleton para ViewModels (mantener el estado)
container.bind(TYPES.PersonaViewModel).to(PersonasVM).inSingletonScope();
container.bind(TYPES.DepartamentoViewModel).to(DepartamentosVM).inSingletonScope();

export { container };

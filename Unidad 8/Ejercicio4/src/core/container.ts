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

container.bind(TYPES.AzureAPI).to(AzureAPI).inSingletonScope();

container.bind(TYPES.IPersonaRepository).to(PersonaRepository);
container.bind(TYPES.IDepartamentoRepository).to(DepartamentoRepository);

container.bind(TYPES.IObtenerPersonasUseCase).to(ObtenerPersonasUseCase);
container.bind(TYPES.ICrearPersonaUseCase).to(CrearPersonaUseCase);
container.bind(TYPES.IActualizarPersonaUseCase).to(ActualizarPersonaUseCase);
container.bind(TYPES.IEliminarPersonaUseCase).to(EliminarPersonaUseCase);

container.bind(TYPES.IObtenerDepartamentosUseCase).to(ObtenerDepartamentosUseCase);
container.bind(TYPES.ICrearDepartamentoUseCase).to(CrearDepartamentoUseCase);
container.bind(TYPES.IActualizarDepartamentoUseCase).to(ActualizarDepartamentoUseCase);
container.bind(TYPES.IEliminarDepartamentoUseCase).to(EliminarDepartamentoUseCase);

container.bind(TYPES.PersonaViewModel).to(PersonasVM).inSingletonScope();
container.bind(TYPES.DepartamentoViewModel).to(DepartamentosVM).inSingletonScope();

export { container };


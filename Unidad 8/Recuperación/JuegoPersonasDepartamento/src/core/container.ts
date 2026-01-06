import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

import { AzureAPI } from "../data/datasource/AzureAPI";

import { DepartamentoRepository } from "../data/repositories/DepartamentoRepository";
import { PersonaRepository } from "../data/repositories/PersonaRepository";
import type { IDepartamentoRepository } from "../domain/interfaces/repositories/IDepartamentoRepository";
import type { IPersonaRepository } from "../domain/interfaces/repositories/IPersonaRepository";

import type { IObtenerPersonasUseCase } from "../domain/interfaces/usecases/IObtenerPersonasUseCase";
import type { IValidarJuegoUseCase } from "../domain/interfaces/usecases/IValidarJuegoUseCase";
import { ObtenerPersonasUseCase } from "../domain/usecases/ObtenerPersonasUseCase";
import { ValidarJuegoUseCase } from "../domain/usecases/ValidarJuegoUseCase";

import { JuegoDepartamentosVM } from "../presenter/viewmodels/JuegoDepartamentosVM";

const container = new Container();

container.bind<AzureAPI>(TYPES.AzureAPI).to(AzureAPI);

container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepository);
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepository);

container.bind<IObtenerPersonasUseCase>(TYPES.IObtenerPersonasUseCase).to(ObtenerPersonasUseCase);
container.bind<IValidarJuegoUseCase>(TYPES.IValidarJuegoUseCase).to(ValidarJuegoUseCase);

container.bind<JuegoDepartamentosVM>(TYPES.JuegoDepartamentosVM).to(JuegoDepartamentosVM);

export { container };

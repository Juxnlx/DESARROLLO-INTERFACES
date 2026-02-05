import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IRepositoryPartida } from "../domain/interfaces/repositories/IRepositoryPartida";
import { PartidaRepository } from "../data/repositories/PartidaRepository";
import { IUseCasePartida } from "../domain/interfaces/usecases/IUseCasePartida";
import { UseCasePartida } from "../domain/usecases/UseCasePartida";

const container = new Container();

// Bind Repository
container.bind<IRepositoryPartida>(TYPES.IRepositoryPartida).to(PartidaRepository);

// Bind UseCase
container.bind<IUseCasePartida>(TYPES.IUseCasePartida).to(UseCasePartida);

export { container };
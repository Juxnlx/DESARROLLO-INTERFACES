import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { IRepositoryPartida } from "../domain/interfaces/repositories/IRepositoryPartida";
import { PartidaRepository } from "../data/repositories/PartidaRepository";
import { IUseCasePartida } from "../domain/interfaces/usecases/IUseCasePartida";
import { UseCasePartida } from "../domain/usecases/UseCasePartida";

/**
 * Contenedor de Inversify que gestiona la inyección de dependencias
 * para la aplicación de Tres en Raya en React Native.
 */
const container = new Container();

// Vincula la interfaz IRepositoryPartida con su implementación concreta PartidaRepository
container.bind<IRepositoryPartida>(TYPES.IRepositoryPartida).to(PartidaRepository);

// Vincula la interfaz IUseCasePartida con su implementación concreta UseCasePartida
container.bind<IUseCasePartida>(TYPES.IUseCasePartida).to(UseCasePartida);

/**
 * Exporta el contenedor para usarlo en la aplicación
 * y resolver dependencias automáticamente donde se necesiten.
 */
export { container };

import { Container } from "inversify";
import "reflect-metadata";
import { PersonasRepository } from "../data/repositories/PersonasRepository";
import { IRepositoryPersonas } from "../domain/interfaces/repository/IRepositoryPersonas";
import { PeopleListVM } from "../presentation/viewmodels/PeopleListVM";
import { TYPES } from "./types";


const container = new Container();

// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepository);

container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);

export { container };

import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import { IRepositoryPersonas } from "../../domain/interfaces/repository/IRepositoryPersonas";
import { IPersonasUseCase } from "../../domain/interfaces/usecase/IPersonasUseCase";


@injectable()
export class PersonaUseCase implements IPersonasUseCase {

    private _listaPersonas: Persona[] = []
    private _personaSelected: Persona;

    constructor(@inject(TYPES.IRepositoryPersonas) private RepoPersonas: IRepositoryPersonas) {
        this._listaPersonas = RepoPersonas.getPersonas()
        this._personaSelected = new Persona()
    }

    getPersonas(): Persona[] {
        return this._listaPersonas
    }

    getPersonaById(id: number): Persona {
        return this.RepoPersonas.getPersonaById(id)
    }

    updatePersona(id: number, ePersona: Persona): number {
        return this.RepoPersonas.updatePersona(id, ePersona)
    }

    deletePersona(id: number): number {
        return this.RepoPersonas.deletePersona(id)
    }

    createPersona(persona: Persona): number {
        return this.RepoPersonas.createPersona(persona)
    }
}
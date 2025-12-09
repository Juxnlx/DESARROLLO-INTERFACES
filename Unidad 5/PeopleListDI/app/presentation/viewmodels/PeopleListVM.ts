import { Persona } from "@/app/domain/entities/Persona";
import { inject } from "inversify";
import { makeAutoObservable } from "mobx";
import { TYPES } from "../../core/types";
import { IRepositoryPersonas } from "../../data/repositories/PersonasRepository";

export class PeopleListVM {


    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
   


    constructor(
        @inject(TYPES.IRepositoryPersonas)
        private RepositoryPersonas: IRepositoryPersonas
    ) {


       
        this._personaSeleccionada = new Persona(0, 'Fernando', 'Galiana');


        this._personasList = this.RepositoryPersonas.getListadoCompletoPersonas();
        makeAutoObservable(this);

    }


    public get personasList(): Persona[] {
        return this._personasList;
    }


    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }


    public set personaSeleccionada(value: Persona) {
    this._personaSeleccionada = value;
}


  }

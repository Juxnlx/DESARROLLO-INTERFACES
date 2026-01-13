import { makeAutoObservable } from "mobx";

/**
 * ViewModel observable para Departamento.
 * Usado en la capa de presentación con MobX.
 */
export class DepartamentoViewModel {
    private _id: number;
    private _nombre: string;

    constructor(id: number, nombre: string) {
        this._id = id;
        this._nombre = nombre;

        makeAutoObservable(this);
    }

    // Getters
    get id(): number { return this._id; }
    get nombre(): string { return this._nombre; }

    // Setters
    set id(value: number) { this._id = value; }
    set nombre(value: string) { this._nombre = value; }
}
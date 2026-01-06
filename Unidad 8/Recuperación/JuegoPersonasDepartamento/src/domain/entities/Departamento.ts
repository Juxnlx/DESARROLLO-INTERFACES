/**
 * Entidad que representa un Departamento de la empresa
 */
export class Departamento {
    //#region ATRIBUTOS PRIVADOS
    private _id: number;
    private _nombre: string;
    //#endregion

    //#region CONSTRUCTOR
    constructor(id: number, nombre: string) {
        this._id = id;
        this._nombre = nombre;
    }
    //#endregion

    //#region GETTERS Y SETTERS
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(value: string) {
        this._nombre = value;
    }
    //#endregion
}
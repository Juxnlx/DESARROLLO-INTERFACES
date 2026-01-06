import { Departamento } from "../entities/Departamento";

/**
 * DTO que combina informacion de una persona con la lista completa de departamentos disponibles
 */
export class PersonaConDepartamentosDTO {
    //#region ATRIBUTOS PRIVADOS
    private _nombrePersona: string;
    private _apellidosPersona: string;
    private _listaDepartamentos: Departamento[];
    private _idDepartamentoSeleccionado: number;
    //#endregion

    //#region CONSTRUCTOR
    constructor(
        nombrePersona: string,
        apellidosPersona: string,
        listaDepartamentos: Departamento[],
        idDepartamentoSeleccionado?: number
    ) {
        this._nombrePersona = nombrePersona;
        this._apellidosPersona = apellidosPersona;
        this._listaDepartamentos = listaDepartamentos;
        this._idDepartamentoSeleccionado = idDepartamentoSeleccionado ?? 0;
    }
    //#endregion

    //#region GETTERS Y SETTERS
    get nombrePersona(): string {
        return this._nombrePersona;
    }

    set nombrePersona(value: string) {
        this._nombrePersona = value;
    }

    get apellidosPersona(): string {
        return this._apellidosPersona;
    }

    set apellidosPersona(value: string) {
        this._apellidosPersona = value;
    }

    get listaDepartamentos(): Departamento[] {
        return this._listaDepartamentos;
    }

    set listaDepartamentos(value: Departamento[]) {
        this._listaDepartamentos = value;
    }

    get idDepartamentoSeleccionado(): number {
        return this._idDepartamentoSeleccionado;
    }

    set idDepartamentoSeleccionado(value: number) {
        this._idDepartamentoSeleccionado = value;
    }
    //#endregion
}
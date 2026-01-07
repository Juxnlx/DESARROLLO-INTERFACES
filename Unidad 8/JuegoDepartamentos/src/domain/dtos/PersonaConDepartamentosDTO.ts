import { Departamento } from "../entities/Departamento";

/**
 * DTO que transporta información de una persona con la lista completa de departamentos.
 * Incluye tanto el ID real del departamento como la selección del usuario.
 */
export class PersonaConDepartamentosDTO {
    private _nombrePersona: string;
    private _apellidosPersona: string;
    private _listaDepartamentos: Departamento[];
    private _idDepartamentoSeleccionado: number;
    private _idDepartamentoReal: number;

    constructor(
        nombrePersona: string,
        apellidosPersona: string,
        listaDepartamentos: Departamento[],
        idDepartamentoReal: number,
        idDepartamentoSeleccionado?: number
    ) {
        this._nombrePersona = nombrePersona;
        this._apellidosPersona = apellidosPersona;
        this._listaDepartamentos = listaDepartamentos;
        this._idDepartamentoReal = idDepartamentoReal;
        this._idDepartamentoSeleccionado = idDepartamentoSeleccionado ?? 0;
    }

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

    get idDepartamentoReal(): number {
        return this._idDepartamentoReal;
    }

    set idDepartamentoReal(value: number) {
        this._idDepartamentoReal = value;
    }
}
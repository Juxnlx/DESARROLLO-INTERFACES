import { Departamento } from "../../domain/entities/Departamento";

export class PersonaConColorViewModel {
    private _nombrePersona: string;
    private _apellidosPersona: string;
    private _listaDepartamentos: Departamento[];
    private _idDepartamentoSeleccionado: number;
    private _colorFondo: string;

    constructor(
        nombrePersona: string,
        apellidosPersona: string,
        listaDepartamentos: Departamento[],
        idDepartamentoSeleccionado: number,
        colorFondo: string
    ) {
        this._nombrePersona = nombrePersona;
        this._apellidosPersona = apellidosPersona;
        this._listaDepartamentos = listaDepartamentos;
        this._idDepartamentoSeleccionado = idDepartamentoSeleccionado;
        this._colorFondo = colorFondo;
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

    get colorFondo(): string {
        return this._colorFondo;
    }

    set colorFondo(value: string) {
        this._colorFondo = value;
    }

    get nombreCompleto(): string {
        return `${this._nombrePersona} ${this._apellidosPersona}`;
    }
}
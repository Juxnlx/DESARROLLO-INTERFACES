import { makeAutoObservable } from "mobx";
import { Departamento } from "../../domain/entities/Departamento";

/**
 * Modelo observable para la vista de cada persona.
 * Añade propiedades específicas de UI como color de fondo y nombre completo.
 * MobX detecta automáticamente cambios en sus propiedades.
 */
export class PersonaConColorViewModel {
    private _nombrePersona: string;
    private _apellidosPersona: string;
    private _listaDepartamentos: Departamento[];
    private _idDepartamentoSeleccionado: number;
    private _colorFondo: string;
    private _idDepartamentoReal: number;

    constructor(
        nombrePersona: string,
        apellidosPersona: string,
        listaDepartamentos: Departamento[],
        idDepartamentoSeleccionado: number,
        colorFondo: string,
        idDepartamentoReal: number
    ) {
        this._nombrePersona = nombrePersona;
        this._apellidosPersona = apellidosPersona;
        this._listaDepartamentos = listaDepartamentos;
        this._idDepartamentoSeleccionado = idDepartamentoSeleccionado;
        this._colorFondo = colorFondo;
        this._idDepartamentoReal = idDepartamentoReal;
        
        makeAutoObservable(this);
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

    get idDepartamentoReal(): number {
        return this._idDepartamentoReal;
    }

    set idDepartamentoReal(value: number) {
        this._idDepartamentoReal = value;
    }

    /**
     * Propiedad computada que retorna nombre y apellidos concatenados.
     */
    get nombreCompleto(): string {
        return `${this._nombrePersona} ${this._apellidosPersona}`;
    }
}
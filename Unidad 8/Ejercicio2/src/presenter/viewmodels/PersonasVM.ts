import { inject, injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
import "reflect-metadata";
import { TYPES } from "../../core/types";
import { PersonaDTO } from "../../domain/dtos/PersonaDTO";
import { Persona } from "../../domain/entities/Persona";
import type { IObtenerDepartamentosUseCase } from "../../domain/interfaces/usecases/departamentos/IObtenerDepartamentoUseCase";
import type { IActualizarPersonaUseCase } from "../../domain/interfaces/usecases/personas/IActualizarPersonaUseCase";
import type { ICrearPersonaUseCase } from "../../domain/interfaces/usecases/personas/ICrearPersonaUseCase";
import type { IEliminarPersonaUseCase } from "../../domain/interfaces/usecases/personas/IEliminarPersonaUseCase";
import type { IObtenerPersonasUseCase } from "../../domain/interfaces/usecases/personas/IObtenerPersonasUseCase";
import { DepartamentoViewModel } from "../models/DepartamentoViewModel";
import { PersonaViewModel } from "../models/PersonaViewModel";

/**
 * ViewModel principal para la gestión de personas.
 * Coordina las operaciones CRUD y gestiona el estado observable.
 */
@injectable()
export class PersonasVM {
    private _listaPersonas: PersonaViewModel[] = [];
    private _listaFiltrada: PersonaViewModel[] = [];
    private _personaSeleccionada: PersonaViewModel | null = null;
    private _listaDepartamentos: DepartamentoViewModel[] = [];
    private _textoBusqueda: string = "";
    private _modoEdicion: boolean = false;
    private _cargando: boolean = false;
    private _error: string | null = null;

    private _casoUsoObtener: IObtenerPersonasUseCase;
    private _casoUsoCrear: ICrearPersonaUseCase;
    private _casoUsoActualizar: IActualizarPersonaUseCase;
    private _casoUsoEliminar: IEliminarPersonaUseCase;
    private _casoUsoObtenerDepartamentos: IObtenerDepartamentosUseCase;

    constructor(
        @inject(TYPES.IObtenerPersonasUseCase) casoUsoObtener: IObtenerPersonasUseCase,
        @inject(TYPES.ICrearPersonaUseCase) casoUsoCrear: ICrearPersonaUseCase,
        @inject(TYPES.IActualizarPersonaUseCase) casoUsoActualizar: IActualizarPersonaUseCase,
        @inject(TYPES.IEliminarPersonaUseCase) casoUsoEliminar: IEliminarPersonaUseCase,
        @inject(TYPES.IObtenerDepartamentosUseCase) casoUsoObtenerDepartamentos: IObtenerDepartamentosUseCase
    ) {
        this._casoUsoObtener = casoUsoObtener;
        this._casoUsoCrear = casoUsoCrear;
        this._casoUsoActualizar = casoUsoActualizar;
        this._casoUsoEliminar = casoUsoEliminar;
        this._casoUsoObtenerDepartamentos = casoUsoObtenerDepartamentos;

        makeAutoObservable(this);
    }

    // Getters
    get listaFiltrada(): PersonaViewModel[] { return this._listaFiltrada; }
    get personaSeleccionada(): PersonaViewModel | null { return this._personaSeleccionada; }
    get listaDepartamentos(): DepartamentoViewModel[] { return this._listaDepartamentos; }
    get modoEdicion(): boolean { return this._modoEdicion; }
    get cargando(): boolean { return this._cargando; }
    get error(): string | null { return this._error; }
    get textoBusqueda(): string { return this._textoBusqueda; }

    /**
     * Carga todas las personas desde el caso de uso.
     */
    async cargarPersonas(): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const personas = await this._casoUsoObtener.obtenerPersonas();
            const personasVM = this.convertirListaAViewModel(personas);

            runInAction(() => {
                this._listaPersonas = personasVM;
                this._listaFiltrada = personasVM;
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al cargar personas";
                this._cargando = false;
            });
        }
    }

    /**
     * Carga la lista de departamentos.
     */
    async cargarDepartamentos(): Promise<void> {
        try {
            const departamentos = await this._casoUsoObtenerDepartamentos.obtenerDepartamentos();
            const departamentosVM = departamentos.map(d => new DepartamentoViewModel(d.id, d.nombre));

            runInAction(() => {
                this._listaDepartamentos = departamentosVM;
            });
        } catch (error) {
            console.error("Error al cargar departamentos:", error);
        }
    }

    /**
     * Carga una persona específica por ID.
     * @param id - ID de la persona
     */
    async cargarPersonaPorId(id: number): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const persona = await this._casoUsoObtener.obtenerPersonaPorId(id);

            runInAction(() => {
                if (persona) {
                    this._personaSeleccionada = this.convertirAViewModel(persona);
                    this._modoEdicion = true;
                }
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al cargar persona";
                this._cargando = false;
            });
        }
    }

    /**
     * Filtra la lista de personas por texto.
     * @param texto - Texto de búsqueda
     */
    filtrar(texto: string): void {
        this._textoBusqueda = texto;
        this.aplicarFiltro();
    }

    /**
     * Crea una nueva persona.
     * @param datos - DTO con datos de la persona
     */
    async crear(datos: PersonaDTO): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            await this._casoUsoCrear.crear(datos);
            await this.cargarPersonas();

            runInAction(() => {
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al crear persona";
                this._cargando = false;
            });
            throw error;
        }
    }

    /**
     * Actualiza una persona existente.
     * @param id - ID de la persona
     * @param datos - DTO con nuevos datos
     */
    async actualizar(id: number, datos: PersonaDTO): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            await this._casoUsoActualizar.actualizar(id, datos);
            await this.cargarPersonas();

            runInAction(() => {
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al actualizar persona";
                this._cargando = false;
            });
            throw error;
        }
    }

    /**
     * Elimina una persona.
     * @param id - ID de la persona a eliminar
     */
    async eliminar(id: number): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            await this._casoUsoEliminar.eliminar(id);
            await this.cargarPersonas();

            runInAction(() => {
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al eliminar persona";
                this._cargando = false;
            });
            throw error;
        }
    }

    /**
     * Selecciona una persona para edición.
     * @param id - ID de la persona
     */
    seleccionar(id: number): void {
        const persona = this._listaPersonas.find(p => p.id === id);
        if (persona) {
            this._personaSeleccionada = persona;
            this._modoEdicion = true;
        }
    }

    /**
     * Limpia la selección actual.
     */
    limpiarSeleccion(): void {
        this._personaSeleccionada = null;
        this._modoEdicion = false;
    }

    /**
     * Aplica el filtro de búsqueda.
     */
    private aplicarFiltro(): void {
        if (!this._textoBusqueda) {
            this._listaFiltrada = this._listaPersonas;
            return;
        }

        const textoLower = this._textoBusqueda.toLowerCase();
        this._listaFiltrada = this._listaPersonas.filter(persona =>
            persona.nombre.toLowerCase().includes(textoLower) ||
            persona.apellidos.toLowerCase().includes(textoLower) ||
            persona.nombreCompleto.toLowerCase().includes(textoLower)
        );
    }

    /**
     * Convierte una entidad Persona a PersonaViewModel.
     */
    private convertirAViewModel(persona: Persona): PersonaViewModel {
        return new PersonaViewModel(
            persona.id,
            persona.nombre,
            persona.apellidos,
            persona.telefono,
            persona.direccion,
            persona.foto,
            persona.fechaNacimiento,
            persona.idDepartamento
        );
    }

    /**
     * Convierte un array de Persona a array de PersonaViewModel.
     */
    private convertirListaAViewModel(personas: Persona[]): PersonaViewModel[] {
        return personas.map(p => this.convertirAViewModel(p));
    }
}
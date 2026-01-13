import "reflect-metadata";
import { makeAutoObservable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { DepartamentoViewModel } from "../models/DepartamentoViewModel";
import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
import { Departamento } from "../../domain/entities/Departamento";
import type { IObtenerDepartamentosUseCase } from "../../domain/interfaces/usecases/departamentos/IObtenerDepartamentoUseCase";
import type { ICrearDepartamentoUseCase } from "../../domain/interfaces/usecases/departamentos/ICrearDepartamentoUseCase";
import type { IActualizarDepartamentoUseCase } from "../../domain/interfaces/usecases/departamentos/IActualizarDepartamentoUseCase";
import type { IEliminarDepartamentoUseCase } from "../../domain/interfaces/usecases/departamentos/IEliminarDepartamentoUseCase";

/**
 * ViewModel principal para la gestión de departamentos.
 * Coordina las operaciones CRUD y gestiona el estado observable.
 */
@injectable()
export class DepartamentosVM {
    private _listaDepartamentos: DepartamentoViewModel[] = [];
    private _listaFiltrada: DepartamentoViewModel[] = [];
    private _departamentoSeleccionado: DepartamentoViewModel | null = null;
    private _textoBusqueda: string = "";
    private _modoEdicion: boolean = false;
    private _cargando: boolean = false;
    private _error: string | null = null;

    private _casoUsoObtener: IObtenerDepartamentosUseCase;
    private _casoUsoCrear: ICrearDepartamentoUseCase;
    private _casoUsoActualizar: IActualizarDepartamentoUseCase;
    private _casoUsoEliminar: IEliminarDepartamentoUseCase;

    constructor(
        @inject(TYPES.IObtenerDepartamentosUseCase) casoUsoObtener: IObtenerDepartamentosUseCase,
        @inject(TYPES.ICrearDepartamentoUseCase) casoUsoCrear: ICrearDepartamentoUseCase,
        @inject(TYPES.IActualizarDepartamentoUseCase) casoUsoActualizar: IActualizarDepartamentoUseCase,
        @inject(TYPES.IEliminarDepartamentoUseCase) casoUsoEliminar: IEliminarDepartamentoUseCase
    ) {
        this._casoUsoObtener = casoUsoObtener;
        this._casoUsoCrear = casoUsoCrear;
        this._casoUsoActualizar = casoUsoActualizar;
        this._casoUsoEliminar = casoUsoEliminar;

        makeAutoObservable(this);
    }

    // Getters
    get listaFiltrada(): DepartamentoViewModel[] { return this._listaFiltrada; }
    get departamentoSeleccionado(): DepartamentoViewModel | null { return this._departamentoSeleccionado; }
    get modoEdicion(): boolean { return this._modoEdicion; }
    get cargando(): boolean { return this._cargando; }
    get error(): string | null { return this._error; }
    get textoBusqueda(): string { return this._textoBusqueda; }

    /**
     * Carga todos los departamentos desde el caso de uso.
     */
    async cargarDepartamentos(): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const departamentos = await this._casoUsoObtener.obtenerDepartamentos();
            const departamentosVM = this.convertirListaAViewModel(departamentos);

            runInAction(() => {
                this._listaDepartamentos = departamentosVM;
                this._listaFiltrada = departamentosVM;
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al cargar departamentos";
                this._cargando = false;
            });
        }
    }

    /**
     * Carga un departamento específico por ID.
     * @param id - ID del departamento
     */
    async cargarDepartamentoPorId(id: number): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const departamento = await this._casoUsoObtener.obtenerDepartamentoPorId(id);

            runInAction(() => {
                if (departamento) {
                    this._departamentoSeleccionado = this.convertirAViewModel(departamento);
                    this._modoEdicion = true;
                }
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al cargar departamento";
                this._cargando = false;
            });
        }
    }

    /**
     * Filtra la lista de departamentos por texto.
     * @param texto - Texto de búsqueda
     */
    filtrar(texto: string): void {
        this._textoBusqueda = texto;
        this.aplicarFiltro();
    }

    /**
     * Crea un nuevo departamento.
     * @param datos - DTO con datos del departamento
     */
    async crear(datos: DepartamentoDTO): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            await this._casoUsoCrear.crear(datos);
            await this.cargarDepartamentos();

            runInAction(() => {
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al crear departamento";
                this._cargando = false;
            });
            throw error;
        }
    }

    /**
     * Actualiza un departamento existente.
     * @param id - ID del departamento
     * @param datos - DTO con nuevos datos
     */
    async actualizar(id: number, datos: DepartamentoDTO): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            await this._casoUsoActualizar.actualizar(id, datos);
            await this.cargarDepartamentos();

            runInAction(() => {
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al actualizar departamento";
                this._cargando = false;
            });
            throw error;
        }
    }

    /**
     * Elimina un departamento.
     * @param id - ID del departamento a eliminar
     */
    async eliminar(id: number): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            await this._casoUsoEliminar.eliminar(id);
            await this.cargarDepartamentos();

            runInAction(() => {
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al eliminar departamento";
                this._cargando = false;
            });
            throw error;
        }
    }

    /**
     * Selecciona un departamento para edición.
     * @param id - ID del departamento
     */
    seleccionar(id: number): void {
        const departamento = this._listaDepartamentos.find(d => d.id === id);
        if (departamento) {
            this._departamentoSeleccionado = departamento;
            this._modoEdicion = true;
        }
    }

    /**
     * Limpia la selección actual.
     */
    limpiarSeleccion(): void {
        this._departamentoSeleccionado = null;
        this._modoEdicion = false;
    }

    /**
     * Aplica el filtro de búsqueda.
     */
    private aplicarFiltro(): void {
        if (!this._textoBusqueda) {
            this._listaFiltrada = this._listaDepartamentos;
            return;
        }

        const textoLower = this._textoBusqueda.toLowerCase();
        this._listaFiltrada = this._listaDepartamentos.filter(departamento =>
            departamento.nombre.toLowerCase().includes(textoLower)
        );
    }

    /**
     * Convierte una entidad Departamento a DepartamentoViewModel.
     */
    private convertirAViewModel(departamento: Departamento): DepartamentoViewModel {
        return new DepartamentoViewModel(departamento.id, departamento.nombre);
    }

    /**
     * Convierte un array de Departamento a array de DepartamentoViewModel.
     */
    private convertirListaAViewModel(departamentos: Departamento[]): DepartamentoViewModel[] {
        return departamentos.map(d => this.convertirAViewModel(d));
    }
}
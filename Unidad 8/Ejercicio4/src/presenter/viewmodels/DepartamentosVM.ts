import { inject, injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
import "reflect-metadata";
import { TYPES } from "../../core/types";
import { DepartamentoDTO } from "../../domain/dtos/DepartamentoDTO";
import { Departamento } from "../../domain/entities/Departamento";
import type { IActualizarDepartamentoUseCase } from "../../domain/interfaces/usecases/departamentos/IActualizarDepartamentoUseCase";
import type { ICrearDepartamentoUseCase } from "../../domain/interfaces/usecases/departamentos/ICrearDepartamentoUseCase";
import type { IEliminarDepartamentoUseCase } from "../../domain/interfaces/usecases/departamentos/IEliminarDepartamentoUseCase";
import type { IObtenerDepartamentosUseCase } from "../../domain/interfaces/usecases/departamentos/IObtenerDepartamentoUseCase";

@injectable()
export class DepartamentosVM {
    private _listaDepartamentos: Departamento[] = [];
    private _departamentoSeleccionado: Departamento | null = null;
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

    // ==================== GETTERS PARA DRAWER ====================
    get departamentos(): Departamento[] { 
        return this._listaDepartamentos; 
    }
    
    get departamentoSeleccionado(): Departamento | null { 
        return this._departamentoSeleccionado; 
    }
    
    get isLoading(): boolean { 
        return this._cargando; 
    }
    
    get error(): string | null { 
        return this._error; 
    }

    // ==================== METODOS PARA DRAWER ====================
    
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

            runInAction(() => {
                this._listaDepartamentos = departamentos;
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
     * Crea un nuevo departamento.
     * @param departamento - Entidad Departamento a crear
     */
    async crearDepartamento(departamento: Departamento): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const dto: DepartamentoDTO = {
                id: departamento.id,
                nombre: departamento.nombre
            };

            await this._casoUsoCrear.crear(dto);
            await this.cargarDepartamentos();

            runInAction(() => {
                this._cargando = false;
                this._departamentoSeleccionado = null; // ← Limpiar selección
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
     * @param departamento - Entidad Departamento con nuevos datos
     */
    async editarDepartamento(id: number, departamento: Departamento): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const dto: DepartamentoDTO = {
                id: departamento.id,
                nombre: departamento.nombre
            };

            await this._casoUsoActualizar.actualizar(id, dto);
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
    async eliminarDepartamento(id: number): Promise<void> {
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
     * Selecciona un departamento para edicion.
     * @param departamento - Departamento a seleccionar
     */
    seleccionarDepartamento(departamento: Departamento): void {
        this._departamentoSeleccionado = departamento;
    }

    /**
     * Limpia la seleccion actual.
     */
    limpiarSeleccion(): void {
        this._departamentoSeleccionado = null;
    }
}
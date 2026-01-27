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
                this._departamentoSeleccionado = null;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al crear departamento";
                this._cargando = false;
            });
            throw error;
        }
    }

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
                this._cargando = false;
            });
            
            throw new Error("No se puede eliminar el departamento porque tiene personas asignadas");
        }
    }

    seleccionarDepartamento(departamento: Departamento): void {
        this._departamentoSeleccionado = departamento;
    }

    limpiarSeleccion(): void {
        this._departamentoSeleccionado = null;
    }
}
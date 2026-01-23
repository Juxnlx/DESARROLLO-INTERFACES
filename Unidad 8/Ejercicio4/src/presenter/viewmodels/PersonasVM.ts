import { inject, injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
import "reflect-metadata";
import { TYPES } from "../../core/types";
import { PersonaDTO } from "../../domain/dtos/PersonaDTO";
import { Persona } from "../../domain/entities/Persona";
import type { IActualizarPersonaUseCase } from "../../domain/interfaces/usecases/personas/IActualizarPersonaUseCase";
import type { ICrearPersonaUseCase } from "../../domain/interfaces/usecases/personas/ICrearPersonaUseCase";
import type { IEliminarPersonaUseCase } from "../../domain/interfaces/usecases/personas/IEliminarPersonaUseCase";
import type { IObtenerPersonasUseCase } from "../../domain/interfaces/usecases/personas/IObtenerPersonasUseCase";

@injectable()
export class PersonasVM {
    private _listaPersonas: Persona[] = [];
    private _personaSeleccionada: Persona | null = null;
    private _cargando: boolean = false;
    private _error: string | null = null;

    private _casoUsoObtener: IObtenerPersonasUseCase;
    private _casoUsoCrear: ICrearPersonaUseCase;
    private _casoUsoActualizar: IActualizarPersonaUseCase;
    private _casoUsoEliminar: IEliminarPersonaUseCase;

    constructor(
        @inject(TYPES.IObtenerPersonasUseCase) casoUsoObtener: IObtenerPersonasUseCase,
        @inject(TYPES.ICrearPersonaUseCase) casoUsoCrear: ICrearPersonaUseCase,
        @inject(TYPES.IActualizarPersonaUseCase) casoUsoActualizar: IActualizarPersonaUseCase,
        @inject(TYPES.IEliminarPersonaUseCase) casoUsoEliminar: IEliminarPersonaUseCase
    ) {
        this._casoUsoObtener = casoUsoObtener;
        this._casoUsoCrear = casoUsoCrear;
        this._casoUsoActualizar = casoUsoActualizar;
        this._casoUsoEliminar = casoUsoEliminar;

        makeAutoObservable(this);
    }

    // ==================== GETTERS PARA DRAWER ====================
    get personas(): Persona[] { 
        return this._listaPersonas; 
    }
    
    get personaSeleccionada(): Persona | null { 
        return this._personaSeleccionada; 
    }
    
    get isLoading(): boolean { 
        return this._cargando; 
    }
    
    get error(): string | null { 
        return this._error; 
    }

    // ==================== METODOS PARA DRAWER ====================
    
    async cargarPersonas(): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
                this._listaPersonas = []; // IMPORTANTE: Limpiar array para forzar actualización
            });

            const personas = await this._casoUsoObtener.obtenerPersonas();

            runInAction(() => {
                this._listaPersonas = personas;
                this._cargando = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al cargar personas";
                this._cargando = false;
            });
        }
    }

    async crearPersona(persona: Persona): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const dto: PersonaDTO = {
                id: persona.id,
                nombre: persona.nombre,
                apellidos: persona.apellidos,
                telefono: persona.telefono,
                direccion: persona.direccion,
                foto: persona.foto,
                fechaNacimiento: persona.fechaNacimiento.toISOString(), 
                idDepartamento: persona.idDepartamento
            };

            await this._casoUsoCrear.crear(dto);
            await this.cargarPersonas();

            runInAction(() => {
                this._cargando = false;
                this._personaSeleccionada = null; 
            });
        } catch (error) {
            runInAction(() => {
                this._error = error instanceof Error ? error.message : "Error al crear persona";
                this._cargando = false;
            });
            throw error;
        }
    }

    async editarPersona(id: number, persona: Persona): Promise<void> {
        try {
            runInAction(() => {
                this._cargando = true;
                this._error = null;
            });

            const dto: PersonaDTO = {
                id: persona.id,
                nombre: persona.nombre,
                apellidos: persona.apellidos,
                telefono: persona.telefono,
                direccion: persona.direccion,
                foto: persona.foto,
                fechaNacimiento: persona.fechaNacimiento.toISOString(), 
                idDepartamento: persona.idDepartamento
            };

            await this._casoUsoActualizar.actualizar(id, dto);
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

    async eliminarPersona(id: number): Promise<void> {
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

    seleccionarPersona(persona: Persona): void {
        this._personaSeleccionada = persona;
    }

    limpiarSeleccion(): void {
        this._personaSeleccionada = null;
    }
}
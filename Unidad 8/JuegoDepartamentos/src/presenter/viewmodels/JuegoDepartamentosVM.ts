import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { TYPES } from "../../core/types";
import { PersonaConDepartamentosDTO } from "../../domain/dtos/PersonaConDepartamentosDTO";
import type { IObtenerPersonasUseCase } from "../../domain/interfaces/usecases/IObtenerPersonasUseCase";
import type { IValidarJuegoUseCase } from "../../domain/interfaces/usecases/IValidarJuegoUseCase";
import { PersonaConColorViewModel } from "../models/PersonaConColorViewModel";

/**
 * ViewModel principal del juego que gestiona el estado y lógica de presentación.
 * Observable de MobX que notifica automáticamente a la vista de cambios.
 */
@injectable()
export class JuegoDepartamentosVM {
    private _listaPersonasConColor: PersonaConColorViewModel[];
    private _cargando: boolean;
    private _mensajeError: string | null;
    private _numeroAciertos: number | null;
    private _juegoCompletado: boolean;
    private _casoUsoObtenerPersonas: IObtenerPersonasUseCase;
    private _casoUsoValidarJuego: IValidarJuegoUseCase;

    constructor(
        @inject(TYPES.IObtenerPersonasUseCase) casoUsoObtenerPersonas: IObtenerPersonasUseCase,
        @inject(TYPES.IValidarJuegoUseCase) casoUsoValidarJuego: IValidarJuegoUseCase
    ) {
        this._listaPersonasConColor = [];
        this._cargando = false;
        this._mensajeError = null;
        this._numeroAciertos = null;
        this._juegoCompletado = false;
        this._casoUsoObtenerPersonas = casoUsoObtenerPersonas;
        this._casoUsoValidarJuego = casoUsoValidarJuego;

        makeAutoObservable(this);
    }

    get listaPersonasConColor(): PersonaConColorViewModel[] {
        return this._listaPersonasConColor;
    }

    get cargando(): boolean {
        return this._cargando;
    }

    get mensajeError(): string | null {
        return this._mensajeError;
    }

    get numeroAciertos(): number | null {
        return this._numeroAciertos;
    }

    get juegoCompletado(): boolean {
        return this._juegoCompletado;
    }

    /**
     * Carga los datos iniciales del juego desde la API.
     * Asigna colores fijos por departamento y crea los ViewModels observables.
     */
    async cargarDatosIniciales() {
        this._cargando = true;
        this._mensajeError = null;

        try {
            const personasDTO = await this._casoUsoObtenerPersonas.obtenerPersonasConDepartamentos();
            const colores = this.generarColoresPorDepartamento(personasDTO);
            const personasConColor: PersonaConColorViewModel[] = [];

            for (const dto of personasDTO) {
                const idDepartamento = dto.idDepartamentoReal;
                const color = colores[idDepartamento] || "#FFFFFF";
                
                const personaConColor = new PersonaConColorViewModel(
                    dto.nombrePersona,
                    dto.apellidosPersona,
                    dto.listaDepartamentos,
                    0,
                    color,
                    idDepartamento
                );
                
                personasConColor.push(personaConColor);
            }

            this._listaPersonasConColor = personasConColor;
        } catch (error) {
            this._mensajeError = error instanceof Error ? error.message : "Error desconocido al cargar datos";
        } finally {
            this._cargando = false;
        }
    }

    /**
     * Actualiza la selección de departamento de una persona.
     * Crea un nuevo array para forzar la reactividad de MobX.
     * @param indice - Índice de la persona en la lista
     * @param idDepartamento - ID del departamento seleccionado
     */
    actualizarSeleccion(indice: number, idDepartamento: number) {
        if (indice >= 0 && indice < this._listaPersonasConColor.length) {
            const nuevaLista = [...this._listaPersonasConColor];
            nuevaLista[indice].idDepartamentoSeleccionado = idDepartamento;
            this._listaPersonasConColor = nuevaLista;
        }
    }

    /**
     * Valida las respuestas del usuario llamando al caso de uso correspondiente.
     * Actualiza el número de aciertos y determina si se completó el juego.
     */
    async validarRespuestas() {
        this._cargando = true;
        this._mensajeError = null;

        try {
            const personasDTO = this.convertirADTO(this._listaPersonasConColor);
            const aciertos = await this._casoUsoValidarJuego.calcularAciertos(personasDTO);
            
            this._numeroAciertos = aciertos;
            this._juegoCompletado = aciertos === this._listaPersonasConColor.length;
        } catch (error) {
            this._mensajeError = error instanceof Error ? error.message : "Error al validar respuestas";
        } finally {
            this._cargando = false;
        }
    }

    /**
     * Reinicia el juego limpiando resultados y selecciones.
     */
    reiniciar() {
        this._numeroAciertos = null;
        this._juegoCompletado = false;
        this._mensajeError = null;

        for (const persona of this._listaPersonasConColor) {
            persona.idDepartamentoSeleccionado = 0;
        }
    }

    /**
     * Genera un mapa de colores fijos para cada departamento.
     * ID 1: Rojo, ID 2: Naranja, ID 3: Azul, ID 4: Verde.
     * @param personas - Array de DTOs con personas
     * @returns Objeto con mapeo {idDepartamento: color}
     */
    private generarColoresPorDepartamento(personas: PersonaConDepartamentosDTO[]): { [key: number]: string } {
        const coloresFijos: { [key: number]: string } = {
            1: "#FFB3B3",
            2: "#FFD9B3",
            3: "#B3D9FF",
            4: "#B3FFB3",
        };

        const colores: { [key: number]: string } = {};

        for (const persona of personas) {
            const idDepartamento = persona.idDepartamentoReal;
            
            if (!colores[idDepartamento]) {
                colores[idDepartamento] = coloresFijos[idDepartamento] || "#E0E0E0";
            }
        }

        return colores;
    }

    /**
     * Convierte los ViewModels a DTOs para enviar a los casos de uso.
     * @param personas - Array de PersonaConColorViewModel
     * @returns Array de PersonaConDepartamentosDTO
     */
    private convertirADTO(personas: PersonaConColorViewModel[]): PersonaConDepartamentosDTO[] {
        const dtos: PersonaConDepartamentosDTO[] = [];

        for (const persona of personas) {
            const dto = new PersonaConDepartamentosDTO(
                persona.nombrePersona,
                persona.apellidosPersona,
                persona.listaDepartamentos,
                persona.idDepartamentoReal,
                persona.idDepartamentoSeleccionado
            );
            dtos.push(dto);
        }

        return dtos;
    }
}
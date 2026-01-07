import { inject, injectable } from "inversify";
import { action, makeAutoObservable } from "mobx";
import { TYPES } from "../../core/types";
import { PersonaConDepartamentosDTO } from "../../domain/dtos/PersonaConDepartamentosDTO";
import type { IObtenerPersonasUseCase } from "../../domain/interfaces/usecases/IObtenerPersonasUseCase";
import type { IValidarJuegoUseCase } from "../../domain/interfaces/usecases/IValidarJuegoUseCase";
import { PersonaConColorViewModel } from "../models/PersonaConColorViewModel";

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

    async cargarDatosIniciales() {
        this._cargando = true;
        this._mensajeError = null;

        try {
            const personasDTO = await this._casoUsoObtenerPersonas.obtenerPersonasConDepartamentos();
            const mapaColores = this.generarMapaColoresPorDepartamento(personasDTO);
            const listaConColores: PersonaConColorViewModel[] = [];

            for (const dto of personasDTO) {
                const idDepartamentoReal = this.extraerIdDepartamentoReal(dto);
                const colorAsignado = mapaColores[idDepartamentoReal] || "#FFFFFF";
                
                const modeloConColor = new PersonaConColorViewModel(
                    dto.nombrePersona,
                    dto.apellidosPersona,
                    dto.listaDepartamentos,
                    0,
                    colorAsignado
                );
                
                listaConColores.push(modeloConColor);
            }

            this._listaPersonasConColor = listaConColores;
        } catch (error) {
            this._mensajeError = error instanceof Error ? error.message : "Error desconocido al cargar datos";
        } finally {
            this._cargando = false;
        }
    }

    actualizarSeleccion(indice: number, idDepartamento: number) {
        if (indice >= 0 && indice < this._listaPersonasConColor.length) {
            this._listaPersonasConColor[indice].idDepartamentoSeleccionado = idDepartamento;
        }
    }

    async validarRespuestas() {
        this._cargando = true;
        this._mensajeError = null;

        try {
            const listaDTO = this.convertirModelosADTO(this._listaPersonasConColor);
            const aciertos = await this._casoUsoValidarJuego.calcularAciertos(listaDTO);
            
            this._numeroAciertos = aciertos;
            this._juegoCompletado = aciertos === this._listaPersonasConColor.length;
        } catch (error) {
            this._mensajeError = error instanceof Error ? error.message : "Error al validar respuestas";
        } finally {
            this._cargando = false;
        }
    }

    reiniciar() {
        this._numeroAciertos = null;
        this._juegoCompletado = false;
        this._mensajeError = null;

        for (const persona of this._listaPersonasConColor) {
            persona.idDepartamentoSeleccionado = 0;
        }
    }

    private generarMapaColoresPorDepartamento(personas: PersonaConDepartamentosDTO[]): { [key: number]: string } {
        const mapaColores: { [key: number]: string } = {};
        const paletaColores = [
            "#FFE5E5", "#E5F5FF", "#E5FFE5", "#FFF5E5", "#F5E5FF",
            "#FFE5F5", "#E5FFFF", "#FFFFE5", "#F5FFE5", "#E5E5FF"
        ];
        let indiceColor = 0;

        for (const persona of personas) {
            const idDepartamento = this.extraerIdDepartamentoReal(persona);
            
            if (!mapaColores[idDepartamento]) {
                mapaColores[idDepartamento] = paletaColores[indiceColor % paletaColores.length];
                indiceColor = indiceColor + 1;
            }
        }

        return mapaColores;
    }

    private extraerIdDepartamentoReal(dto: PersonaConDepartamentosDTO): number {
        return dto.listaDepartamentos[0]?.id || 0;
    }

    private convertirModelosADTO(modelos: PersonaConColorViewModel[]): PersonaConDepartamentosDTO[] {
        const listaDTO: PersonaConDepartamentosDTO[] = [];

        for (const modelo of modelos) {
            const dto = new PersonaConDepartamentosDTO(
                modelo.nombrePersona,
                modelo.apellidosPersona,
                modelo.listaDepartamentos,
                modelo.idDepartamentoSeleccionado
            );
            listaDTO.push(dto);
        }

        return listaDTO;
    }
}
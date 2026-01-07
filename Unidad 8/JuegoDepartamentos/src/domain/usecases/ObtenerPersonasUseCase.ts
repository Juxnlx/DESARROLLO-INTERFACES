import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { PersonaConDepartamentosDTO } from "../dtos/PersonaConDepartamentosDTO";
import type { Persona } from "../entities/Persona";
import type { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import type { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import type { IObtenerPersonasUseCase } from "../interfaces/usecases/IObtenerPersonasUseCase";

/**
 * Caso de uso que obtiene personas con la lista completa de departamentos.
 * Combina información de dos repositorios diferentes.
 */
@injectable()
export class ObtenerPersonasUseCase implements IObtenerPersonasUseCase {
    private repositorioPersonas: IPersonaRepository;
    private repositorioDepartamentos: IDepartamentoRepository;

    constructor(
        @inject(TYPES.IPersonaRepository) repositorioPersonas: IPersonaRepository,
        @inject(TYPES.IDepartamentoRepository) repositorioDepartamentos: IDepartamentoRepository
    ) {
        this.repositorioPersonas = repositorioPersonas;
        this.repositorioDepartamentos = repositorioDepartamentos;
    }

    /**
     * Obtiene todas las personas con la lista completa de departamentos para el selector.
     * Crea DTOs con el ID real del departamento y la selección inicializada en 0.
     * @returns Promise con array de PersonaConDepartamentosDTO
     */
    async obtenerPersonasConDepartamentos(): Promise<PersonaConDepartamentosDTO[]> {
        const todasLasPersonas = await this.repositorioPersonas.getAllPersonas();
        const todosLosDepartamentos = await this.repositorioDepartamentos.getAllDepartamentos();
        
        const listaResultado: PersonaConDepartamentosDTO[] = [];
        
        for (const persona of todasLasPersonas) {
            const dto = new PersonaConDepartamentosDTO(
                persona.nombre,
                persona.apellidos,
                todosLosDepartamentos,
                persona.idDepartamento,
                0
            );
            listaResultado.push(dto);
        }
        
        return listaResultado;
    }

    /**
     * Busca una persona específica por su ID.
     * @param idPersona - ID de la persona a buscar
     * @returns Promise con entidad Persona o null si no existe
     */
    async buscarPersonaPorId(idPersona: number): Promise<Persona | null> {
        const persona = await this.repositorioPersonas.getPersonaById(idPersona);
        return persona;
    }
}
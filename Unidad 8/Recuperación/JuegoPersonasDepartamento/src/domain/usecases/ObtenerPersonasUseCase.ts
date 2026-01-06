import { inject, injectable } from "inversify";
import { TYPES } from "../../core/types";
import { PersonaConDepartamentosDTO } from "../dtos/PersonaConDepartamentosDTO";
import type { Persona } from "../entities/Persona";
import type { IDepartamentoRepository } from "../interfaces/repositories/IDepartamentoRepository";
import type { IPersonaRepository } from "../interfaces/repositories/IPersonaRepository";
import type { IObtenerPersonasUseCase } from "../interfaces/usecases/IObtenerPersonasUseCase";

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

    async obtenerPersonasConDepartamentos(): Promise<PersonaConDepartamentosDTO[]> {
        const todasLasPersonas = await this.repositorioPersonas.getAllPersonas();
        const todosLosDepartamentos = await this.repositorioDepartamentos.getAllDepartamentos();
        
        const listaResultado: PersonaConDepartamentosDTO[] = [];
        
        for (const persona of todasLasPersonas) {
            const dto = new PersonaConDepartamentosDTO(
                persona.nombre,
                persona.apellidos,
                todosLosDepartamentos,
                0
            );
            listaResultado.push(dto);
        }
        
        return listaResultado;
    }

    async buscarPersonaPorId(idPersona: number): Promise<Persona | null> {
        const persona = await this.repositorioPersonas.getPersonaById(idPersona);
        return persona;
    }
}
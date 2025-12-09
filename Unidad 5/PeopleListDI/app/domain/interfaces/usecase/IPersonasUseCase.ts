import { Persona } from "../../entities/Persona"; // Asegúrate de que la ruta de Persona sea correcta

/**
 * Define el contrato para el Caso de Uso de Personas.
 * Estos métodos representan las operaciones de negocio sobre la entidad Persona.
 */
export interface IPersonasUseCase {
    
    // Recupera la lista completa de personas
    getPersonas(): Persona[];
    
    // Recupera una persona por su ID
    getPersonaById(id: number): Persona;
    
    // Actualiza una persona existente. Devuelve el resultado (e.g., número de filas afectadas)
    updatePersona(id: number, ePersona: Persona): number;
    
    // Elimina una persona por su ID. Devuelve el resultado
    deletePersona(id: number): number;
    
    // Crea (inserta) una nueva persona. Devuelve el resultado (e.g., el nuevo ID)
    createPersona(persona: Persona): number;
}
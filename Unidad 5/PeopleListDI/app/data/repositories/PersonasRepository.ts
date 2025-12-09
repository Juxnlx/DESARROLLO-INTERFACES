import { injectable } from "inversify";
import { Persona } from "../../domain/entities/Persona"; // Asumiendo que esta es la ruta a la clase Persona

// Interfaz que define el contrato del repositorio (capa de abstracción)
export interface IRepositoryPersonas {
    getListadoCompletoPersonas(): Persona[];
}

// 1. Repositorio de Personas Base (6 elementos)
@injectable()
export class PersonasRepository implements IRepositoryPersonas {
    getListadoCompletoPersonas(): Persona[] {
        // En un futuro, esto podría hacer llamadas a una API que nos ofreciera los datos [cite: 118, 119]
        return [
            new Persona(1, 'Fernando', 'Galiana Fernández'),
            new Persona(2, 'Carlos', 'Martínez López'),
            new Persona(3, 'Ana', 'Rodríguez Pérez'),
            new Persona(4, 'Miguel', 'Sánchez Ruiz'),
            new Persona(5, 'Laura', 'Torres Díaz'),
            new Persona(6, 'David', 'Moreno García'),
        ];
    }
}

// 2. Repositorio de Personas Vacío (Para el Test 1)
// Devuelve un listado vacío[cite: 135].
@injectable()
export class PersonasRepositoryEmpty implements IRepositoryPersonas {
    getListadoCompletoPersonas(): Persona[] {
        return []; // Retorna una lista vacía
    }
}

// 3. Repositorio de 100 Personas (Para el Test 2)
// Devuelve un listado con 100 personas[cite: 138].
@injectable()
export class PersonasRepository100 implements IRepositoryPersonas {
    getListadoCompletoPersonas(): Persona[] {
        const personas: Persona[] = [];
        for (let i = 1; i <= 100; i++) {
            personas.push(new Persona(i, `Nombre${i}`, `Apellido${i}`));
        }
        return personas; // Retorna la lista con 100 elementos
    }
}
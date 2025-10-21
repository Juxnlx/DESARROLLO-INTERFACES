import { injectable } from "inversify";
import { Persona } from "../Entities/Persona";

/**
 * Interfaz para el repositorio de Personas.
 */
export interface IRepositoryPersonas {
    /**
     * Obtiene el listado completo de personas.
     * @returns Un array de objetos Persona.
     */
    getListadoCompletoPersonas(): Persona[];
}

@injectable()
export class PersonasRepository implements IRepositoryPersonas {

    getListadoCompletoPersonas(): Persona[] {

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

@injectable()
export class PersonasRepositoryEmpty implements IRepositoryPersonas {

    getListadoCompletoPersonas(): Persona[] {
        
        return [];
    }
}

@injectable()
export class PersonasRepository100 implements IRepositoryPersonas {

    getListadoCompletoPersonas(): Persona[] {
        // Esta es la ÚNICA implementación con 100 personas declaradas explícitamente.
        return [
            new Persona(1, 'Fernando', 'Galiana Fernández'),
            new Persona(2, 'Carlos', 'Martínez López'),
            new Persona(3, 'Ana', 'Rodríguez Pérez'),
            new Persona(4, 'Miguel', 'Sánchez Ruiz'),
            new Persona(5, 'Laura', 'Torres Díaz'),
            new Persona(6, 'David', 'Moreno García'),
            new Persona(7, 'Sofía', 'Ramírez Vargas'),
            new Persona(8, 'Javier', 'Gutiérrez Sánchez'),
            new Persona(9, 'Marta', 'Díaz Navarro'),
            new Persona(10, 'Pablo', 'Muñoz Herrera'),
            new Persona(11, 'Elena', 'Ruiz Castro'),
            new Persona(12, 'Adrián', 'Pérez Ortega'),
            new Persona(13, 'Lucía', 'Serrano Gil'),
            new Persona(14, 'Hugo', 'Romero Núñez'),
            new Persona(15, 'Paula', 'Vargas Delgado'),
            new Persona(16, 'Daniel', 'Flores Morales'),
            new Persona(17, 'Irene', 'Garrido Rico'),
            new Persona(18, 'Alejandro', 'Blanco Cruz'),
            new Persona(19, 'María', 'Reyes Cano'),
            new Persona(20, 'Sergio', 'Torres Marín'),
            new Persona(21, 'Nuria', 'Ortega Prieto'),
            new Persona(22, 'Ricardo', 'Alonso Pardo'),
            new Persona(23, 'Julia', 'Gómez Vidal'),
            new Persona(24, 'Manuel', 'Sáez Ferrer'),
            new Persona(25, 'Carla', 'Santos Bosch'),
            new Persona(26, 'Gabriel', 'Castro Rivas'),
            new Persona(27, 'Silvia', 'Navarro Luna'),
            new Persona(28, 'Marcos', 'Herrera Montes'),
            new Persona(29, 'Andrea', 'López Pardo'),
            new Persona(30, 'Álvaro', 'Martínez Soto'),
            new Persona(31, 'Clara', 'Soto Reyes'),
            new Persona(32, 'Guillermo', 'Cano Vidal'),
            new Persona(33, 'Rosa', 'Ferrer Bosch'),
            new Persona(34, 'Jaime', 'Rivas Luna'),
            new Persona(35, 'Natalia', 'Montes Pardo'),
            new Persona(36, 'Héctor', 'Gil Marín'),
            new Persona(37, 'Isabel', 'Prieto Rivas'),
            new Persona(38, 'Jesús', 'Vidal Alonso'),
            new Persona(39, 'Esther', 'Ferrer Santos'),
            new Persona(40, 'Félix', 'Bosch Castro'),
            new Persona(41, 'Raquel', 'Luna Navarro'),
            new Persona(42, 'Rubén', 'Montes Herrera'),
            new Persona(43, 'Diana', 'Pardo López'),
            new Persona(44, 'Jorge', 'Soto Martínez'),
            new Persona(45, 'Patricia', 'Reyes Cano'),
            new Persona(46, 'Roberto', 'Vidal Ortega'),
            new Persona(47, 'Sara', 'Santos Prieto'),
            new Persona(48, 'Tomás', 'Castro Alonso'),
            new Persona(49, 'Vanesa', 'Navarro Ferrer'),
            new Persona(50, 'Víctor', 'Herrera Bosch'),
            new Persona(51, 'Yolanda', 'López Rivas'),
            new Persona(52, 'Zacarías', 'Martínez Luna'),
            new Persona(53, 'Beatriz', 'Soto Montes'),
            new Persona(54, 'César', 'Cano Pardo'),
            new Persona(55, 'Débora', 'Ferrer Soto'),
            new Persona(56, 'Emilio', 'Rivas Cano'),
            new Persona(57, 'Gema', 'Montes Vidal'),
            new Persona(58, 'Iván', 'Pardo Santos'),
            new Persona(59, 'Karen', 'Soto Castro'),
            new Persona(60, 'Leo', 'Reyes Navarro'),
            new Persona(61, 'Monica', 'Vidal Herrera'),
            new Persona(62, 'Nico', 'Santos López'),
            new Persona(63, 'Olga', 'Castro Martínez'),
            new Persona(64, 'Pau', 'Navarro Soto'),
            new Persona(65, 'Quique', 'Herrera Reyes'),
            new Persona(66, 'Rocío', 'López Vidal'),
            new Persona(67, 'Samuel', 'Martínez Santos'),
            new Persona(68, 'Tania', 'Soto Castro'),
            new Persona(69, 'Ulises', 'Cano Navarro'),
            new Persona(70, 'Wendy', 'Ferrer Herrera'),
            new Persona(71, 'Xavi', 'Rivas López'),
            new Persona(72, 'Yago', 'Montes Martínez'),
            new Persona(73, 'Zoe', 'Pardo Soto'),
            new Persona(74, 'Ángel', 'Soto Reyes'),
            new Persona(75, 'Bárbara', 'Reyes Vidal'),
            new Persona(76, 'Cristian', 'Vidal Santos'),
            new Persona(77, 'Desiree', 'Santos Castro'),
            new Persona(78, 'Eduardo', 'Castro Navarro'),
            new Persona(79, 'Fátima', 'Navarro Herrera'),
            new Persona(80, 'Gerard', 'Herrera López'),
            new Persona(81, 'Henar', 'López Martínez'),
            new Persona(82, 'Íñigo', 'Martínez Soto'),
            new Persona(83, 'Kira', 'Soto Reyes'),
            new Persona(84, 'Lara', 'Cano Vidal'),
            new Persona(85, 'Mario', 'Ferrer Santos'),
            new Persona(86, 'Nerea', 'Rivas Bosch'),
            new Persona(87, 'Óscar', 'Montes Luna'),
            new Persona(88, 'Penélope', 'Pardo Herrera'),
            new Persona(89, 'Quim', 'Soto López'),
            new Persona(90, 'Rita', 'Reyes Martínez'),
            new Persona(91, 'Saúl', 'Vidal Soto'),
            new Persona(92, 'Teresa', 'Santos Reyes'),
            new Persona(93, 'Ursula', 'Castro Vidal'),
            new Persona(94, 'Vicente', 'Navarro Santos'),
            new Persona(95, 'Wilma', 'Herrera Castro'),
            new Persona(96, 'Yeray', 'López Navarro'),
            new Persona(97, 'Zulema', 'Martínez Herrera'),
            new Persona(98, 'Abel', 'Soto López'),
            new Persona(99, 'Berta', 'Reyes Martínez'),
            new Persona(100, 'Camilo', 'Vidal Soto')
        ];
    }
}



import { Movimiento } from "../../entities/Movimiento";

/**
 * Interfaz que define los métodos para interactuar con la partida del Tres en Raya.
 * Sirve para implementar repositorios que gestionen la comunicación con el servidor.
 */
export interface IRepositoryPartida {
  /**
   * Conecta al repositorio/servidor.
   * @returns {Promise<void>} Promesa que se resuelve cuando la conexión se establece.
   */
  connect(): Promise<void>;

  /**
   * Desconecta del repositorio/servidor.
   * @returns {Promise<void>} Promesa que se resuelve cuando se desconecta correctamente.
   */
  disconnect(): Promise<void>;

  /**
   * Envía un movimiento al servidor para que sea registrado en la partida.
   * @param {Movimiento} movimiento - Movimiento que se desea enviar.
   * @returns {Promise<void>} Promesa que se resuelve cuando el movimiento se envía correctamente.
   */
  enviarMovimiento(movimiento: Movimiento): Promise<void>;

  /**
   * Se suscribe a eventos emitidos por el repositorio/servidor.
   * @param {string} eventName - Nombre del evento a escuchar.
   * @param {(...args: any[]) => void} callback - Función que se ejecuta cuando se dispara el evento.
   */
  on(eventName: string, callback: (...args: any[]) => void): void;

  /**
   * Notifica al servidor que la partida ha finalizado.
   * @param {string} simboloGanador - Símbolo del jugador ganador ("X" u "O").
   * @returns {Promise<void>} Promesa que se resuelve cuando la notificación se envía correctamente.
   */
  notificarFinPartida(simboloGanador: string): Promise<void>;
}

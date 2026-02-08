import { Movimiento } from "../../entities/Movimiento";

/**
 * Interfaz que define los casos de uso de la partida de Tres en Raya.
 * Actúa como capa de negocio para interactuar con el repositorio o servicio de la partida.
 */
export interface IUseCasePartida {
  /**
   * Conecta al servicio de la partida.
   * @returns {Promise<void>} Promesa que se resuelve cuando la conexión se establece.
   */
  connect(): Promise<void>;

  /**
   * Desconecta del servicio de la partida.
   * @returns {Promise<void>} Promesa que se resuelve cuando la desconexión se completa.
   */
  disconnect(): Promise<void>;

  /**
   * Envía un movimiento al servicio para que se registre en la partida.
   * @param {Movimiento} movimiento - Movimiento que se desea enviar.
   * @returns {Promise<void>} Promesa que se resuelve cuando el movimiento se envía correctamente.
   */
  enviarMovimiento(movimiento: Movimiento): Promise<void>;

  /**
   * Se suscribe a eventos emitidos por el servicio de la partida.
   * @param {string} eventName - Nombre del evento a escuchar.
   * @param {(...args: any[]) => void} callback - Función que se ejecuta cuando se dispara el evento.
   */
  on(eventName: string, callback: (...args: any[]) => void): void;

  /**
   * Notifica al servicio que la partida ha finalizado.
   * @param {string} simboloGanador - Símbolo del jugador ganador ("X" u "O").
   * @returns {Promise<void>} Promesa que se resuelve cuando la notificación se envía correctamente.
   */
  notificarFinPartida(simboloGanador: string): Promise<void>;
}

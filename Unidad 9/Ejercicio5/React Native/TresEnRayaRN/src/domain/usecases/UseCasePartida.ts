import { injectable, inject } from "inversify";
import { IUseCasePartida } from "../interfaces/usecases/IUseCasePartida";
import { IRepositoryPartida } from "../interfaces/repositories/IRepositoryPartida";
import { Movimiento } from "../entities/Movimiento";
import { TYPES } from "../../core/types";

/**
 * Caso de uso de la partida de Tres en Raya.
 * Gestiona la lógica de negocio y se comunica con el repositorio.
 */
@injectable()
export class UseCasePartida implements IUseCasePartida {
  /** Repositorio que maneja la comunicación con el servidor */
  private repository: IRepositoryPartida;

  /**
   * Crea un nuevo caso de uso y recibe el repositorio mediante inyección de dependencias.
   * @param {IRepositoryPartida} repository - Repositorio para interactuar con la partida
   */
  constructor(@inject(TYPES.IRepositoryPartida) repository: IRepositoryPartida) {
    this.repository = repository;
  }

  /**
   * Conecta al servidor usando el repositorio.
   */
  async connect(): Promise<void> {
    await this.repository.connect();
  }

  /**
   * Desconecta del servidor usando el repositorio.
   */
  async disconnect(): Promise<void> {
    await this.repository.disconnect();
  }

  /**
   * Envía un movimiento al servidor usando el repositorio.
   * @param {Movimiento} movimiento - Movimiento a enviar
   */
  async enviarMovimiento(movimiento: Movimiento): Promise<void> {
    await this.repository.enviarMovimiento(movimiento);
  }

  /**
   * Se suscribe a un evento emitido por el servidor.
   * @param {string} eventName - Nombre del evento a escuchar
   * @param {(...args: any[]) => void} callback - Función que se ejecuta cuando se dispara el evento
   */
  on(eventName: string, callback: (...args: any[]) => void): void {
    this.repository.on(eventName, callback);
  }

  /**
   * Notifica al servidor que la partida ha finalizado y quién ha ganado.
   * @param {string} simboloGanador - Símbolo del jugador ganador ("X" u "O")
   */
  async notificarFinPartida(simboloGanador: string): Promise<void> {
    await this.repository.notificarFinPartida(simboloGanador);
  }
}

import { injectable } from "inversify";
import { IRepositoryPartida } from "../../domain/interfaces/repositories/IRepositoryPartida";
import { Movimiento } from "../../domain/entities/Movimiento";
import { PartidaDataSource } from "../datasource/PartidaDataSource";

/**
 * Repositorio encargado de gestionar la comunicación entre la aplicación
 * y el servidor SignalR para la partida de Tres en Raya.
 * Implementa la interfaz IRepositoryPartida.
 */
@injectable()
export class PartidaRepository implements IRepositoryPartida {
  /** DataSource que maneja la conexión SignalR */
  private dataSource: PartidaDataSource;

  /**
   * Crea un nuevo repositorio e inicializa el DataSource con la URL del Hub.
   */
  constructor() {
    // URL local del Hub de SignalR
    this.dataSource = new PartidaDataSource("http://192.168.0.29:5217/partidahub");
  }

  /**
   * Conecta al servidor SignalR usando el DataSource.
   */
  async connect(): Promise<void> {
    await this.dataSource.connect();
  }

  /**
   * Desconecta del servidor SignalR usando el DataSource.
   */
  async disconnect(): Promise<void> {
    await this.dataSource.disconnect();
  }

  /**
   * Envía un movimiento al servidor usando el DataSource.
   * @param {Movimiento} movimiento - Movimiento a enviar
   */
  async enviarMovimiento(movimiento: Movimiento): Promise<void> {
    await this.dataSource.enviarMovimiento(movimiento);
  }

  /**
   * Se suscribe a eventos emitidos por el servidor.
   * @param {string} eventName - Nombre del evento a escuchar
   * @param {(...args: any[]) => void} callback - Función a ejecutar al recibir el evento
   */
  on(eventName: string, callback: (...args: any[]) => void): void {
    this.dataSource.on(eventName, callback);
  }

  /**
   * Notifica al servidor que la partida ha terminado y quién ha ganado.
   * @param {string} simboloGanador - Símbolo del jugador ganador ("X" u "O")
   */
  async notificarFinPartida(simboloGanador: string): Promise<void> {
    await this.dataSource.invoke("NotificarFinPartida", simboloGanador);
  }
}

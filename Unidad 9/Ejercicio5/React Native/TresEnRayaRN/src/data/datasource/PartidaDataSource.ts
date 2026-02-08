import * as signalR from "@microsoft/signalr";
import { Movimiento } from "../../domain/entities/Movimiento";

/**
 * DataSource encargado de la comunicación con el servidor SignalR
 * para la gestión de partidas de Tres en Raya.
 */
export class PartidaDataSource {
  /** Conexión actual al Hub de SignalR */
  private connection: signalR.HubConnection | null = null;

  /** URL del Hub de SignalR */
  private readonly hubUrl: string;

  /**
   * Crea un nuevo datasource para conectarse a un Hub de SignalR.
   * @param {string} hubUrl - URL del Hub de SignalR
   */
  constructor(hubUrl: string) {
    this.hubUrl = hubUrl;
  }

  /**
   * Conecta al servidor SignalR y establece la conexión al Hub.
   * Configura LongPolling como transporte y reconexión automática.
   */
  async connect(): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        transport: signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect()
      .build();

    await this.connection.start();
    console.log("✅ Conectado a SignalR");
  }

  /**
   * Desconecta del servidor SignalR si hay conexión activa.
   */
  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      console.log("Desconectado de SignalR");
    }
  }

  /**
   * Envía un movimiento al servidor mediante SignalR.
   * @param {Movimiento} movimiento - Movimiento que se desea enviar
   */
  async enviarMovimiento(movimiento: Movimiento): Promise<void> {
    if (this.connection) {
      await this.connection.invoke("EnviarMovimiento", movimiento);
    }
  }

  /**
   * Invoca un método arbitrario en el servidor SignalR.
   * @param {string} methodName - Nombre del método a invocar en el Hub
   * @param {...any[]} args - Argumentos que se pasarán al método
   * @throws Error si no hay conexión activa con el servidor
   */
  async invoke(methodName: string, ...args: any[]): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke(methodName, ...args);
    } else {
      throw new Error("No hay conexión con el servidor");
    }
  }

  /**
   * Se suscribe a un evento emitido por el servidor SignalR.
   * @param {string} eventName - Nombre del evento a escuchar
   * @param {(...args: any[]) => void} callback - Función que se ejecuta cuando se dispara el evento
   */
  on(eventName: string, callback: (...args: any[]) => void): void {
    if (this.connection) {
      this.connection.on(eventName, callback);
    }
  }
}

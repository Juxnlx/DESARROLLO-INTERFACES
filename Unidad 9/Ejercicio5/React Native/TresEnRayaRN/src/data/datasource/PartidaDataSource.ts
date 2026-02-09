import * as signalR from "@microsoft/signalr";
import { Movimiento } from "../../domain/entities/Movimiento";

/**
 * DataSource que maneja la conexión con el servidor SignalR.
 * Responsable de establecer y mantener la conexión, enviar movimientos
 * y suscribirse a eventos del servidor.
 */
export class PartidaDataSource {
  /** Conexión de SignalR al Hub del servidor */
  private connection: signalR.HubConnection | null = null;
  
  /** URL del Hub de SignalR */
  private readonly hubUrl: string;

  /**
   * Crea una nueva instancia del DataSource.
   * @param {string} hubUrl - URL completa del Hub de SignalR
   */
  constructor(hubUrl: string) {
    this.hubUrl = hubUrl;
  }

  /**
   * Establece la conexión con el servidor SignalR.
   */
  async connect(): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        // Permitir WebSockets y LongPolling (fallback automático)
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
        skipNegotiation: false
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    console.log("🔄 Intentando conectar a SignalR...");
    await this.connection.start();
    console.log("✅ Conectado a SignalR");
  }

  /**
   * Desconecta del servidor SignalR.
   */
  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      console.log("Desconectado de SignalR");
    }
  }

  /**
   * Envía un movimiento al servidor.
   * @param {Movimiento} movimiento - Movimiento a enviar
   */
  async enviarMovimiento(movimiento: Movimiento): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("EnviarMovimiento", movimiento);
    }
  }

  /**
   * Invoca un método del Hub en el servidor.
   * @param {string} methodName - Nombre del método del Hub
   * @param {...any[]} args - Argumentos del método
   */
  async invoke(methodName: string, ...args: any[]): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke(methodName, ...args);
    } else {
      throw new Error("No hay conexión con el servidor");
    }
  }

  /**
   * Se suscribe a un evento del servidor.
   * @param {string} eventName - Nombre del evento
   * @param {Function} callback - Función a ejecutar cuando se reciba el evento
   */
  on(eventName: string, callback: (...args: any[]) => void): void {
    if (this.connection) {
      this.connection.on(eventName, callback);
    }
  }
}
import * as signalR from "@microsoft/signalr";
import { Movimiento } from "../../domain/entities/Movimiento";

export class PartidaDataSource {
  private connection: signalR.HubConnection | null = null;
  private readonly hubUrl: string;

  constructor(hubUrl: string) {
    this.hubUrl = hubUrl;
  }

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

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      console.log("Desconectado de SignalR");
    }
  }

  async enviarMovimiento(movimiento: Movimiento): Promise<void> {
    if (this.connection) {
      await this.connection.invoke("EnviarMovimiento", movimiento);
    }
  }

  // Método genérico para suscribirse a eventos
  on(eventName: string, callback: (...args: any[]) => void): void {
    if (this.connection) {
      this.connection.on(eventName, callback);
    }
  }
}
import { injectable } from "inversify";
import { IRepositoryPartida } from "../../domain/interfaces/repositories/IRepositoryPartida";
import { Movimiento } from "../../domain/entities/Movimiento";
import { PartidaDataSource } from "../datasource/PartidaDataSource";

@injectable()
export class PartidaRepository implements IRepositoryPartida {
  private dataSource: PartidaDataSource;

  constructor() {
    // IMPORTANTE: Cambia esta URL por la de tu servidor
    this.dataSource = new PartidaDataSource("http://192.168.0.29:5217/partidahub");
  }

  async connect(): Promise<void> {
    await this.dataSource.connect();
  }

  async disconnect(): Promise<void> {
    await this.dataSource.disconnect();
  }

  async enviarMovimiento(movimiento: Movimiento): Promise<void> {
    await this.dataSource.enviarMovimiento(movimiento);
  }

  on(eventName: string, callback: (...args: any[]) => void): void {
    this.dataSource.on(eventName, callback);
  }
}
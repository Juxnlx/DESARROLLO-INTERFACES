import { injectable, inject } from "inversify";
import { IUseCasePartida } from "../interfaces/usecases/IUseCasePartida";
import { IRepositoryPartida } from "../interfaces/repositories/IRepositoryPartida";
import { Movimiento } from "../entities/Movimiento";
import { TYPES } from "../../core/types";

@injectable()
export class UseCasePartida implements IUseCasePartida {
  private repository: IRepositoryPartida;

  constructor(@inject(TYPES.IRepositoryPartida) repository: IRepositoryPartida) {
    this.repository = repository;
  }

  async connect(): Promise<void> {
    await this.repository.connect();
  }

  async disconnect(): Promise<void> {
    await this.repository.disconnect();
  }

  async enviarMovimiento(movimiento: Movimiento): Promise<void> {
    await this.repository.enviarMovimiento(movimiento);
  }

  on(eventName: string, callback: (...args: any[]) => void): void {
    this.repository.on(eventName, callback);
  }
}
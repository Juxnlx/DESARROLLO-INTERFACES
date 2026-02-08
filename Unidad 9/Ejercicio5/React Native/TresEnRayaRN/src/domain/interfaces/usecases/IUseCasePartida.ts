import { Movimiento } from "../../entities/Movimiento";

export interface IUseCasePartida {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  enviarMovimiento(movimiento: Movimiento): Promise<void>;
  on(eventName: string, callback: (...args: any[]) => void): void;
  notificarFinPartida(simboloGanador: string): Promise<void>;  // ← Añadir parámetro
}
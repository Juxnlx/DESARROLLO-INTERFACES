import { makeAutoObservable, runInAction } from "mobx";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { IUseCasePartida } from "../../domain/interfaces/usecases/IUseCasePartida";
import { Movimiento } from "../../domain/entities/Movimiento";
import { Tablero } from "../../domain/entities/Tablero";

export class VMPartida {
  // Propiedades observables
  miSimbolo: string | null = null;
  estadoJuego: string = "esperando"; // "esperando" | "jugando" | "finalizado"
  mensajeEstado: string = "Conectando...";
  tablero: Tablero = new Tablero();
  casillasOcupadas: number = 0;
  esMiTurno: boolean = false;

  private useCase: IUseCasePartida;

  constructor() {
    makeAutoObservable(this);
    this.useCase = container.get<IUseCasePartida>(TYPES.IUseCasePartida);
  }

  // Conectar al servidor y configurar eventos
  async inicializar(): Promise<void> {
    try {
      await this.useCase.connect();
      this.configurarEventos();
    } catch (error) {
      console.error("Error al conectar:", error);
      runInAction(() => {
        this.mensajeEstado = "Error de conexión";
      });
    }
  }

  // Configurar eventos de SignalR
  private configurarEventos(): void {
    // Cuando me asignan un símbolo
    this.useCase.on("SimboloAsignado", (simbolo: string) => {
      runInAction(() => {
        this.miSimbolo = simbolo;
        this.mensajeEstado = `Esperando oponente... Eres ${simbolo}`;
      });
      console.log("🎯 Símbolo asignado:", simbolo);
    });

    // Cuando la partida inicia
    this.useCase.on("IniciarPartida", () => {
      runInAction(() => {
        this.estadoJuego = "jugando";
        const esJugadorX = this.miSimbolo === "X";
        this.esMiTurno = esJugadorX;
        this.mensajeEstado = esJugadorX ? "Tu turno" : "Turno del oponente";
      });
      console.log("🎮 Partida iniciada!");
    });

    // Cuando recibo un movimiento
    this.useCase.on("RecibirMovimiento", (movimiento: Movimiento) => {
      this.aplicarMovimiento(movimiento);
    });

    // Cuando un jugador se desconecta
    this.useCase.on("JugadorDesconectado", () => {
      runInAction(() => {
        this.estadoJuego = "finalizado";
        this.mensajeEstado = "El oponente se ha desconectado";
        this.esMiTurno = false;
      });
      console.log("Jugador desconectado");
    });

    // Cuando la partida está llena
    this.useCase.on("PartidaLlena", () => {
      runInAction(() => {
        this.mensajeEstado = "La partida ya está llena";
      });
      console.log("Partida llena");
    });
  }

  // Realizar un movimiento
  async realizarMovimiento(fila: number, columna: number): Promise<void> {
    // Validaciones
    if (!this.esMiTurno) {
      console.log("No es tu turno");
      return;
    }

    if (this.estadoJuego !== "jugando") {
      console.log("La partida no está en curso");
      return;
    }

    if (this.tablero.celdas[fila][columna] !== "") {
      console.log("Casilla ocupada");
      return;
    }

    // Crear y enviar el movimiento
    const movimiento = new Movimiento([fila, columna], this.miSimbolo!);

    try {
      await this.useCase.enviarMovimiento(movimiento);
      
      // NO cambiamos el turno aquí, lo haremos cuando recibamos el movimiento
    } catch (error) {
      console.error("Error al enviar movimiento:", error);
    }
  }

  // Aplicar un movimiento recibido
  private aplicarMovimiento(movimiento: Movimiento): void {
    const [fila, columna] = movimiento.posicion;
    
    runInAction(() => {
      const colocado = this.tablero.colocarMovimiento(fila, columna, movimiento.simbolo);
      
      if (colocado) {
        this.casillasOcupadas++;
        console.log(`Movimiento aplicado: [${fila}, ${columna}] = ${movimiento.simbolo}`);

        // PRIMERO verificar ganador
        let hayGanadorOEmpate = false;
        if (this.casillasOcupadas >= 5) {
          hayGanadorOEmpate = this.verificarGanador();
        }

        // SOLO cambiar turno si NO hay ganador ni empate
        if (!hayGanadorOEmpate && this.estadoJuego === "jugando") {
          const esMiMovimiento = movimiento.simbolo === this.miSimbolo;
          if (esMiMovimiento) {
            // Yo hice el movimiento, ahora es turno del rival
            this.esMiTurno = false;
            this.mensajeEstado = "Turno del oponente";
          } else {
            // El rival hizo el movimiento, ahora es mi turno
            this.esMiTurno = true;
            this.mensajeEstado = "Tu turno";
          }
        }
      }
    });
  }

  // Verificar si hay ganador o empate
  private verificarGanador(): boolean {
    const ganador = this.tablero.verificarGanador();
    
    if (ganador) {
      this.estadoJuego = "finalizado";
      this.esMiTurno = false;
      
      if (ganador === this.miSimbolo) {
        this.mensajeEstado = "¡Has ganado! 🎉";
      } else {
        this.mensajeEstado = "Has perdido 😢";
      }
      
      console.log("Ganador:", ganador);
      return true; // Hay ganador
    }

    // Verificar empate
    if (this.tablero.verificarEmpate()) {
      this.estadoJuego = "finalizado";
      this.mensajeEstado = "¡Empate! 🤝";
      this.esMiTurno = false;
      console.log("Empate");
      return true; // Hay empate
    }

    return false; // No hay ganador ni empate
  }

  // Desconectar del servidor
  async desconectar(): Promise<void> {
    try {
      await this.useCase.disconnect();
    } catch (error) {
      console.error("Error al desconectar:", error);
    }
  }
}
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
  esperandoReset: boolean = false;
  simboloGanador: string | null = null;

  private useCase: IUseCasePartida;
  private partidaTerminadaNotificada: boolean = false;

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
        this.partidaTerminadaNotificada = false; // Reset flag
        this.simboloGanador = null;
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

    // Cuando el servidor confirma que la partida terminó
    this.useCase.on("PartidaTerminada", () => {
      runInAction(() => {
        this.esperandoReset = true;
        console.log("⏳ Esperando reset del servidor...");
      });
    });

    // Cuando el servidor está listo para una nueva partida
    this.useCase.on("ListoParaNuevaPartida", (turnoInicial: string) => {
      runInAction(() => {
        this.esperandoReset = false;
        console.log(`✅ Servidor listo - Turno inicial: ${turnoInicial}`);
        
        // Guardar quién debe empezar
        this.turnoInicialProximaPartida = turnoInicial;
      });
    });
  }

  private turnoInicialProximaPartida: string = "X";

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
            this.esMiTurno = false;
            this.mensajeEstado = "Turno del oponente";
          } else {
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
      this.simboloGanador = ganador;
      
      if (ganador === this.miSimbolo) {
        this.mensajeEstado = "¡Has ganado! 🎉";
      } else {
        this.mensajeEstado = "Has perdido 😢";
      }
      
      console.log("Ganador:", ganador);
      
      // Notificar al servidor quién ganó
      this.notificarFinPartida(ganador);
      
      return true;
    }

    // Verificar empate
    if (this.tablero.verificarEmpate()) {
      this.estadoJuego = "finalizado";
      this.mensajeEstado = "¡Empate! 🤝";
      this.esMiTurno = false;
      this.simboloGanador = "EMPATE";
      console.log("Empate");
      
      // Notificar empate (sin ganador)
      this.notificarFinPartida("EMPATE");
      
      return true;
    }

    return false;
  }

  // Notificar al servidor que la partida terminó (solo una vez)
  private notificarFinPartida(resultado: string): void {
    if (!this.partidaTerminadaNotificada) {
      this.partidaTerminadaNotificada = true;
      
      this.useCase.notificarFinPartida(resultado).catch(err => {
        console.error("Error al notificar fin de partida:", err);
      });
    }
  }

  // Resetear el tablero local para jugar de nuevo
  jugarDeNuevo(): void {
    runInAction(() => {
      this.tablero.resetear();
      this.casillasOcupadas = 0;
      this.estadoJuego = "jugando";
      this.partidaTerminadaNotificada = false;
      
      // El ganador empieza (o X si fue empate)
      const empiezaQuien = this.turnoInicialProximaPartida;
      const esMiTurno = this.miSimbolo === empiezaQuien;
      
      this.esMiTurno = esMiTurno;
      this.mensajeEstado = esMiTurno ? "Tu turno" : "Turno del oponente";
      
      console.log(`🔄 Nueva partida - Empieza: ${empiezaQuien}, ¿Es mi turno? ${esMiTurno}`);
    });
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
import { makeAutoObservable, runInAction } from "mobx";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { IUseCasePartida } from "../../domain/interfaces/usecases/IUseCasePartida";
import { Movimiento } from "../../domain/entities/Movimiento";
import { Tablero } from "../../domain/entities/Tablero";

/**
 * ViewModel de la partida de Tres en Raya.
 * Gestiona el estado observable del juego, los movimientos,
 * la interacción con SignalR y la lógica de negocio de la partida.
 */
export class VMPartida {
  // ----------------------------
  // Propiedades observables
  // ----------------------------
  miSimbolo: string | null = null; // Símbolo asignado al jugador
  estadoJuego: string = "esperando"; // "esperando" | "jugando" | "finalizado"
  mensajeEstado: string = "Conectando..."; // Mensaje para mostrar en la UI
  tablero: Tablero = new Tablero(); // Tablero local de la partida
  casillasOcupadas: number = 0; // Contador de movimientos realizados
  esMiTurno: boolean = false; // Indica si es el turno del jugador
  esperandoReset: boolean = false; // Flag para esperar reset del servidor
  simboloGanador: string | null = null; // Símbolo del ganador

  private useCase: IUseCasePartida; // Capa de negocio
  private partidaTerminadaNotificada: boolean = false; // Evita múltiples notificaciones de fin de partida
  private turnoInicialProximaPartida: string = "X"; // Turno que empieza la próxima partida

  /**
   * Inicializa el ViewModel y obtiene el caso de uso del contenedor.
   */
  constructor() {
    makeAutoObservable(this); // Hace que todas las propiedades sean observables
    this.useCase = container.get<IUseCasePartida>(TYPES.IUseCasePartida);
  }

  // ----------------------------
  // Métodos de inicialización
  // ----------------------------

  /**
   * Conecta al servidor y configura los eventos de SignalR.
   */
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

  /**
   * Configura todos los eventos de SignalR relacionados con la partida.
   */
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
        this.partidaTerminadaNotificada = false;
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
        this.turnoInicialProximaPartida = turnoInicial;
        console.log(`✅ Servidor listo - Turno inicial: ${turnoInicial}`);
      });
    });
  }

  // ----------------------------
  // Métodos de juego
  // ----------------------------

  /**
   * Realiza un movimiento si es válido y es el turno del jugador.
   * @param fila - Fila del tablero (0-2)
   * @param columna - Columna del tablero (0-2)
   */
  async realizarMovimiento(fila: number, columna: number): Promise<void> {
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

    const movimiento = new Movimiento([fila, columna], this.miSimbolo!);

    try {
      await this.useCase.enviarMovimiento(movimiento);
    } catch (error) {
      console.error("Error al enviar movimiento:", error);
    }
  }

  /**
   * Aplica un movimiento recibido desde el servidor al tablero local.
   * @param movimiento - Movimiento recibido
   */
  private aplicarMovimiento(movimiento: Movimiento): void {
    const [fila, columna] = movimiento.posicion;
    
    runInAction(() => {
      const colocado = this.tablero.colocarMovimiento(fila, columna, movimiento.simbolo);
      
      if (colocado) {
        this.casillasOcupadas++;
        console.log(`Movimiento aplicado: [${fila}, ${columna}] = ${movimiento.simbolo}`);

        let hayGanadorOEmpate = false;
        if (this.casillasOcupadas >= 5) {
          hayGanadorOEmpate = this.verificarGanador();
        }

        if (!hayGanadorOEmpate && this.estadoJuego === "jugando") {
          const esMiMovimiento = movimiento.simbolo === this.miSimbolo;
          this.esMiTurno = !esMiMovimiento;
          this.mensajeEstado = esMiMovimiento ? "Turno del oponente" : "Tu turno";
        }
      }
    });
  }

  /**
   * Verifica si hay ganador o empate después de un movimiento.
   * @returns true si hubo ganador o empate, false si la partida sigue
   */
  private verificarGanador(): boolean {
    const ganador = this.tablero.verificarGanador();
    
    if (ganador) {
      this.estadoJuego = "finalizado";
      this.esMiTurno = false;
      this.simboloGanador = ganador;
      this.mensajeEstado = ganador === this.miSimbolo ? "¡Has ganado! 🎉" : "Has perdido 😢";
      console.log("Ganador:", ganador);
      this.notificarFinPartida(ganador);
      return true;
    }

    if (this.tablero.verificarEmpate()) {
      this.estadoJuego = "finalizado";
      this.mensajeEstado = "¡Empate! 🤝";
      this.esMiTurno = false;
      this.simboloGanador = "EMPATE";
      console.log("Empate");
      this.notificarFinPartida("EMPATE");
      return true;
    }

    return false;
  }

  /**
   * Notifica al servidor que la partida ha terminado.
   * Se asegura de notificar solo una vez.
   * @param resultado - Símbolo del ganador o "EMPATE"
   */
  private notificarFinPartida(resultado: string): void {
    if (!this.partidaTerminadaNotificada) {
      this.partidaTerminadaNotificada = true;
      this.useCase.notificarFinPartida(resultado).catch(err => {
        console.error("Error al notificar fin de partida:", err);
      });
    }
  }

  /**
   * Resetea el tablero local y comienza una nueva partida.
   */
  jugarDeNuevo(): void {
    runInAction(() => {
      this.tablero.resetear();
      this.casillasOcupadas = 0;
      this.estadoJuego = "jugando";
      this.partidaTerminadaNotificada = false;

      const empiezaQuien = this.turnoInicialProximaPartida;
      const esMiTurno = this.miSimbolo === empiezaQuien;

      this.esMiTurno = esMiTurno;
      this.mensajeEstado = esMiTurno ? "Tu turno" : "Turno del oponente";

      console.log(`🔄 Nueva partida - Empieza: ${empiezaQuien}, ¿Es mi turno? ${esMiTurno}`);
    });
  }

  /**
   * Desconecta del servidor.
   */
  async desconectar(): Promise<void> {
    try {
      await this.useCase.disconnect();
    } catch (error) {
      console.error("Error al desconectar:", error);
    }
  }
}

/**
 * Representa un movimiento en el tablero del Tres en Raya.
 * Contiene la posición (fila y columna) y el símbolo del jugador.
 */
export class Movimiento {
  /** Posición del movimiento en el tablero [fila, columna] */
  posicion: number[];

  /** Símbolo del jugador que realiza el movimiento ("X" u "O") */
  simbolo: string;

  /**
   * Crea un nuevo movimiento con la posición y el símbolo especificados.
   * @param {number[]} posicion - Coordenadas del tablero [fila, columna].
   * @param {string} simbolo - Símbolo del jugador que realiza el movimiento.
   */
  constructor(posicion: number[], simbolo: string) {
    this.posicion = posicion;
    this.simbolo = simbolo;
  }
}

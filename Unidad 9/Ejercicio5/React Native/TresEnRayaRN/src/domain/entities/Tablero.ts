/**
 * Representa el tablero del Tres en Raya.
 * Gestiona las celdas, colocación de movimientos y verificación de ganador o empate.
 */
export class Tablero {
  /** Matriz de 3x3 que almacena los símbolos de cada celda ("X", "O" o vacío "") */
  celdas: string[][];

  /**
   * Inicializa un tablero vacío de 3x3.
   */
  constructor() {
    this.celdas = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  /**
   * Coloca un movimiento en el tablero si la celda está vacía.
   * @param {number} fila - Índice de la fila (0-2)
   * @param {number} columna - Índice de la columna (0-2)
   * @param {string} simbolo - Símbolo del jugador ("X" u "O")
   * @returns {boolean} true si el movimiento se colocó, false si la celda estaba ocupada
   */
  colocarMovimiento(fila: number, columna: number, simbolo: string): boolean {
    if (this.celdas[fila][columna] === '') {
      this.celdas[fila][columna] = simbolo;
      return true;
    }
    return false;
  }

  /**
   * Reinicia el tablero a su estado vacío inicial.
   */
  resetear(): void {
    this.celdas = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  /**
   * Verifica si hay un ganador en el tablero.
   * Revisa filas, columnas y diagonales.
   * @returns {string | null} El símbolo del ganador ("X" u "O"), o null si no hay ganador
   */
  verificarGanador(): string | null {
    // Verificar filas
    for (let i = 0; i < 3; i++) {
      if (this.celdas[i][0] !== '' && 
          this.celdas[i][0] === this.celdas[i][1] && 
          this.celdas[i][1] === this.celdas[i][2]) {
        return this.celdas[i][0];
      }
    }

    // Verificar columnas
    for (let i = 0; i < 3; i++) {
      if (this.celdas[0][i] !== '' && 
          this.celdas[0][i] === this.celdas[1][i] && 
          this.celdas[1][i] === this.celdas[2][i]) {
        return this.celdas[0][i];
      }
    }

    // Verificar diagonal principal
    if (this.celdas[0][0] !== '' && 
        this.celdas[0][0] === this.celdas[1][1] && 
        this.celdas[1][1] === this.celdas[2][2]) {
      return this.celdas[0][0];
    }

    // Verificar diagonal secundaria
    if (this.celdas[0][2] !== '' && 
        this.celdas[0][2] === this.celdas[1][1] && 
        this.celdas[1][1] === this.celdas[2][0]) {
      return this.celdas[0][2];
    }

    return null;
  }

  /**
   * Verifica si el tablero está lleno y no hay ganador, es decir, hay empate.
   * @returns {boolean} true si hay empate, false en caso contrario
   */
  verificarEmpate(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.celdas[i][j] === '') {
          return false; // Si hay una celda vacía, no hay empate
        }
      }
    }
    return this.verificarGanador() === null; // Empate si tablero lleno y sin ganador
  }
}

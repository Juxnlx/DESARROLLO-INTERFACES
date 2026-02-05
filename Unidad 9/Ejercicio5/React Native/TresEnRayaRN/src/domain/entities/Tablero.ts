export class Tablero {
  celdas: string[][];

  constructor() {
    this.celdas = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  // Colocar movimiento en el tablero
  colocarMovimiento(fila: number, columna: number, simbolo: string): boolean {
    if (this.celdas[fila][columna] === '') {
      this.celdas[fila][columna] = simbolo;
      return true;
    }
    return false;
  }

  // Resetear el tablero
  resetear(): void {
    this.celdas = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }

  // Verificar si hay ganador
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

  // Verificar si hay empate
  verificarEmpate(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.celdas[i][j] === '') {
          return false;
        }
      }
    }
    return this.verificarGanador() === null;
  }
}
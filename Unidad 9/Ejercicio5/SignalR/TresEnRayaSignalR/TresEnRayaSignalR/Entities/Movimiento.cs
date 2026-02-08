namespace TresEnRayaSignalR.Entities
{
    /// <summary>
    /// Representa un movimiento realizado por un jugador en la partida.
    /// Contiene la posición del tablero y el símbolo del jugador.
    /// </summary>
    public class Movimiento
    {
        /// <summary>
        /// Posición del movimiento en el tablero (fila y columna).
        /// </summary>
        public int[] Posicion { get; set; } = new int[2];

        /// <summary>
        /// Símbolo del jugador que realiza el movimiento ("X" u "O").
        /// </summary>
        public string Simbolo { get; set; } = string.Empty;

        /// <summary>
        /// Constructor que inicializa la posición y el símbolo del movimiento.
        /// </summary>
        /// <param name="posicion">Coordenadas del tablero (fila y columna).</param>
        /// <param name="simbolo">Símbolo del jugador.</param>
        public Movimiento(int[] posicion, string simbolo)
        {
            Posicion = posicion;
            Simbolo = simbolo;
        }

        /// <summary>
        /// Constructor vacío.
        /// </summary>
        public Movimiento() { }
    }
}

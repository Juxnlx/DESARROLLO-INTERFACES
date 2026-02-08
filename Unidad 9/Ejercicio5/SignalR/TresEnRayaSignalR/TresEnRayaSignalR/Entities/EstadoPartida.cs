namespace TresEnRayaSignalR.Entities
{
    /// <summary>
    /// Clase estática que mantiene el estado global de la partida.
    /// Almacena el número de jugadores, el turno actual y los identificadores de conexión.
    /// </summary>
    public static class EstadoPartida
    {
        /// <summary>
        /// Número total de jugadores conectados a la partida.
        /// </summary>
        public static int TotalJugadores { get; set; } = 0;

        /// <summary>
        /// Indica a qué jugador le corresponde el turno actual ("X" u "O").
        /// </summary>
        public static string TurnoActual { get; set; } = "X";

        /// <summary>
        /// Identificador de conexión del jugador X.
        /// </summary>
        public static string ConnectionIdJugadorX { get; set; } = string.Empty;

        /// <summary>
        /// Identificador de conexión del jugador O.
        /// </summary>
        public static string ConnectionIdJugadorO { get; set; } = string.Empty;

        /// <summary>
        /// Restablece el estado de la partida a sus valores iniciales.
        /// </summary>
        public static void Resetear()
        {
            TotalJugadores = 0;
            TurnoActual = "X";
            ConnectionIdJugadorX = string.Empty;
            ConnectionIdJugadorO = string.Empty;

            Console.WriteLine("Estado de partida reseteado");
        }
    }
}

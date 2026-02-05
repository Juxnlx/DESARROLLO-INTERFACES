namespace TresEnRayaSignalR.Entities
{
    public static class EstadoPartida
    {
        public static int TotalJugadores { get; set; } = 0;
        public static string TurnoActual { get; set; } = "X";
        public static string ConnectionIdJugadorX { get; set; } = string.Empty;
        public static string ConnectionIdJugadorO { get; set; } = string.Empty;

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
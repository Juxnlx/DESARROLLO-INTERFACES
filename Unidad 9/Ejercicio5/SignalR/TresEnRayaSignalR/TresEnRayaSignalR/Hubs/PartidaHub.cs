using Microsoft.AspNetCore.SignalR;
using TresEnRayaSignalR.Entities;

namespace TresEnRayaSignalR.Hubs
{
    /// <summary>
    /// Encargado de gestionar la lógica de la partida del Tres en Raya.
    /// Controla conexiones, turnos, movimientos y finalización de partida.
    /// </summary>
    public class PartidaHub : Hub
    {
        /// <summary>
        /// Método que se ejecuta automáticamente cuando un cliente se conecta al Hub.
        /// Asigna el jugador (X u O) y gestiona el inicio de la partida.
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            EstadoPartida.TotalJugadores++;

            Console.WriteLine("=================================");
            Console.WriteLine($"JUGADOR CONECTADO: {Context.ConnectionId}");
            Console.WriteLine($"Total jugadores: {EstadoPartida.TotalJugadores}");

            if (EstadoPartida.TotalJugadores == 1)
            {
                EstadoPartida.ConnectionIdJugadorX = Context.ConnectionId;
                Console.WriteLine($"Asignado como JUGADOR X");

                await Clients.Caller.SendAsync("SimboloAsignado", "X");
            }
            else if (EstadoPartida.TotalJugadores == 2)
            {
                EstadoPartida.ConnectionIdJugadorO = Context.ConnectionId;
                Console.WriteLine($"Asignado como JUGADOR O");

                await Clients.Caller.SendAsync("SimboloAsignado", "O");

                await Clients.All.SendAsync("IniciarPartida");
            }
            else
            {
                await Clients.Caller.SendAsync("PartidaLlena");
                Context.Abort();
                Console.WriteLine("Conexión rechazada - Partida llena");
                return;
            }

            Console.WriteLine("=================================");
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Recibe un movimiento enviado por un cliente y verifica si es válido
        /// según el turno actual y el jugador que lo envía.
        /// </summary>
        /// <param name="movimiento">Movimiento realizado por el jugador.</param>
        public async Task EnviarMovimiento(Movimiento movimiento)
        {
            bool esTurnoValido = false;

            if (movimiento.Simbolo == "X" && Context.ConnectionId == EstadoPartida.ConnectionIdJugadorX
                && EstadoPartida.TurnoActual == "X")
            {
                esTurnoValido = true;
            }
            else if (movimiento.Simbolo == "O" && Context.ConnectionId == EstadoPartida.ConnectionIdJugadorO
                && EstadoPartida.TurnoActual == "O")
            {
                esTurnoValido = true;
            }

            if (!esTurnoValido)
            {
                Console.WriteLine($"Movimiento rechazado - turno inválido");
                return;
            }

            EstadoPartida.TurnoActual = EstadoPartida.TurnoActual == "X" ? "O" : "X";

            Console.WriteLine($"Movimiento válido - Nuevo turno: {EstadoPartida.TurnoActual}");

            await Clients.All.SendAsync("RecibirMovimiento", movimiento);
        }

        /// <summary>
        /// Notifica a todos los clientes que la partida ha terminado y prepara una nueva partida.
        /// </summary>
        /// <param name="simboloGanador">Símbolo del jugador ganador (X u O) o cualquier otro valor en caso de empate.</param>
        public async Task NotificarFinPartida(string simboloGanador)
        {
            Console.WriteLine("=================================");
            Console.WriteLine($"PARTIDA FINALIZADA - Ganador: {simboloGanador}");
            Console.WriteLine("=================================");

            await Clients.All.SendAsync("PartidaTerminada");

            await Task.Delay(3000);

            if (simboloGanador == "X" || simboloGanador == "O")
            {
                EstadoPartida.TurnoActual = simboloGanador;
                Console.WriteLine($"Nueva partida - Empieza el ganador: {simboloGanador}");
            }
            else
            {
                EstadoPartida.TurnoActual = "X";
                Console.WriteLine("Nueva partida - Empate, empieza X por defecto");
            }

            await Clients.All.SendAsync("ListoParaNuevaPartida", EstadoPartida.TurnoActual);
        }

        /// <summary>
        /// Método que se ejecuta cuando un cliente se desconecta del Hub.
        /// Si queda menos de dos jugadores, se resetea el estado de la partida.
        /// </summary>
        /// <param name="exception">Excepción producida durante la desconexión, si existe.</param>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            EstadoPartida.TotalJugadores--;

            Console.WriteLine("=================================");
            Console.WriteLine($"JUGADOR DESCONECTADO: {Context.ConnectionId}");
            Console.WriteLine($"Total jugadores restantes: {EstadoPartida.TotalJugadores}");
            Console.WriteLine("=================================");

            if (EstadoPartida.TotalJugadores < 2)
            {
                await Clients.All.SendAsync("JugadorDesconectado");
                EstadoPartida.Resetear();
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}

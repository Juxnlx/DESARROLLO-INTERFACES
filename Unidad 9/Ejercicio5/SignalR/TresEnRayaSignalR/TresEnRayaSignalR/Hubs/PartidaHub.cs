using Microsoft.AspNetCore.SignalR;
using TresEnRayaSignalR.Entities;

namespace TresEnRayaSignalR.Hubs
{
    public class PartidaHub : Hub
    {
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

                // Enviar símbolo al jugador 1
                await Clients.Caller.SendAsync("SimboloAsignado", "X");
            }
            else if (EstadoPartida.TotalJugadores == 2)
            {
                EstadoPartida.ConnectionIdJugadorO = Context.ConnectionId;
                Console.WriteLine($"Asignado como JUGADOR O");

                // Enviar símbolo al jugador 2
                await Clients.Caller.SendAsync("SimboloAsignado", "O");

                // Iniciar partida
                await Clients.All.SendAsync("IniciarPartida");
            }
            else
            {
                // Si hay más de 2 jugadores, rechazar la conexión
                await Clients.Caller.SendAsync("PartidaLlena");
                Context.Abort();
                Console.WriteLine("Conexión rechazada - Partida llena");
                return;
            }

            Console.WriteLine("=================================");
            await base.OnConnectedAsync();
        }

        public async Task EnviarMovimiento(Movimiento movimiento)
        {
            // Verificar que es el turno correcto
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

            // Cambiar el turno
            EstadoPartida.TurnoActual = EstadoPartida.TurnoActual == "X" ? "O" : "X";

            Console.WriteLine($"Movimiento válido - Nuevo turno: {EstadoPartida.TurnoActual}");

            // Enviar el movimiento a todos los clientes
            await Clients.All.SendAsync("RecibirMovimiento", movimiento);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            EstadoPartida.TotalJugadores--;

            Console.WriteLine("=================================");
            Console.WriteLine($"JUGADOR DESCONECTADO: {Context.ConnectionId}");
            Console.WriteLine($"Total jugadores restantes: {EstadoPartida.TotalJugadores}");
            Console.WriteLine("=================================");

            // Si un jugador se desconecta, resetear la partida
            if (EstadoPartida.TotalJugadores < 2)
            {
                await Clients.All.SendAsync("JugadorDesconectado");
                EstadoPartida.Resetear();
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}

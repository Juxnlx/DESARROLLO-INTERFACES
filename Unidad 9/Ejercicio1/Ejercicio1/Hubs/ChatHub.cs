using Microsoft.AspNetCore.SignalR;

namespace Ejercicio1.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(clsMensajeUsuario obj)
        {
            await Clients.All.SendAsync("ReceiveMessage", obj);
        }
    }
}
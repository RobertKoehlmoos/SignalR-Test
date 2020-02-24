using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.ReceiveMessage(user, message);
        }

        public async Task Announce(string message) {
            await Clients.All.Announce(message);
        }
    }

    public interface IChatClient {
        Task Announce(string message);
        Task ReceiveMessage(string user, string message);
    }
}
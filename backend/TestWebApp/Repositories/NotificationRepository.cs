using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestWebApp.Models;
using TestWebApp.NotificationsHubs;

namespace TestWebApp.Repositories
{
    public class NotificationRepository:INotificationService
    {
        private IHubContext<HeroesNotificationHub> _hubContext;

        public NotificationRepository(IHubContext<HeroesNotificationHub> hubContext)
        {
            this._hubContext = hubContext;
        }

        public async void DeleteHero(Hero hero)
        {
            await _hubContext.Clients.All.SendAsync("NotifyDeleteHero", hero);
        }

        public async void AddHero(Hero hero)
        {
            await _hubContext.Clients.All.SendAsync("NotifyAddHero", hero);
        }

        public async void UpdateHero(Hero hero)
        {
            await _hubContext.Clients.All.SendAsync("NotifyUpdateHero", hero);
        }
    }
}

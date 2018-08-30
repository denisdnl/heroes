using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestWebApp.Models;
using TestWebApp.Repositories;

namespace TestWebApp.NotificationsHubs
{
    public class HeroesNotificationHub:Hub
    {
        private INotificationService _notificationService;

        public HeroesNotificationHub(INotificationService notificationService)
        {
            this._notificationService = notificationService;
        }

        public void NotifyDeleteHero(Hero hero)
        {
            _notificationService.DeleteHero(hero);
        }

        public void NotifyAddHero(Hero hero)
        {
            _notificationService.AddHero(hero);
        }

        public void NotifyUpdateHero(Hero hero)
        {
            _notificationService.UpdateHero(hero);
        }
    }
}

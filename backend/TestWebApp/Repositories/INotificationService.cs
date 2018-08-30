using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestWebApp.Models;

namespace TestWebApp.Repositories
{
    public interface INotificationService
    {
        void DeleteHero(Hero hero);
        void UpdateHero(Hero hero);
        void AddHero(Hero hero);
    }
}

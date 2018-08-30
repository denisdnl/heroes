using System.Collections.Generic;
using TestWebApp.Models;

namespace TestWebApp.Repositories
{
    public interface IHeroesRepository
    {
        void DeleteHero(int id);
        Hero GetHero(int id);
        IEnumerable<Hero> GetHeroes();
        void AddHero(Hero value);
        void UpdateHero(Hero hero);
    }
}
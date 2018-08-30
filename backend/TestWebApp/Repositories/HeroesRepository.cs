using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestWebApp.Contexts;
using TestWebApp.Models;

namespace TestWebApp.Repositories
{
    public class HeroesRepository : IHeroesRepository
    {
        private HeroesContext _context;
        public HeroesRepository(HeroesContext context)
        {
            this._context = context;
        }

        public IEnumerable<Hero> GetHeroes()
        {
            List<Hero> heroes = new List<Hero>();

            var h = _context.Heroes.Select<HeroDbModel, Hero>(x => (new Hero() {Id=x.Id, Name = x.Name, Owner = x.Owner.Owner }));

            heroes.AddRange(h.AsEnumerable());
            return heroes.AsEnumerable<Hero>();
        }

        public Hero GetHero(int id)
        {
            var h = _context.Heroes.Select<HeroDbModel, Hero>(x => (new Hero() { Id = x.Id, Name = x.Name, Owner = x.Owner.Owner }));
            return h.Where<Hero>(x => x.Id == id).First<Hero>();
        }

        public void DeleteHero(int id)
        {
            try
            {
                _context.Remove<HeroDbModel>(_context.Heroes.Where<HeroDbModel>(x => x.Id == id).First());
                _context.SaveChanges();
            }
            catch(Exception ex)
            {

            }
        }

        public void AddHero(Hero hero)
        {

            OwnerDbModel owner;
            var owners = _context.Owners.Where<OwnerDbModel>(x => x.Owner == hero.Owner);
            if (owners.Count() == 0)
            {
                owner = new OwnerDbModel();
                owner.Owner = hero.Owner;
                _context.Owners.Add(owner);
            }
            else
                owner = owners.First();

            HeroDbModel heroDb = new HeroDbModel();
            heroDb.Name = hero.Name;
            heroDb.Owner = owner;
            _context.Heroes.Add(heroDb);
            _context.SaveChanges();

        }


        public void UpdateHero(Hero hero)
        {

            OwnerDbModel owner;
            var owners = _context.Owners.Where<OwnerDbModel>(x => x.Owner == hero.Owner);
            if (owners.Count() == 0)
            {
                owner = new OwnerDbModel();
                owner.Owner = hero.Owner;
                _context.Owners.Add(owner);
            }
            else
                owner = owners.First();

            var heroes = _context.Heroes.Where<HeroDbModel>(x => x.Id == hero.Id);

            if (heroes.Count() == 0)
                return;

            HeroDbModel heroDb = heroes.First();
            heroDb.Name = hero.Name;
            heroDb.Owner = owner;
            _context.Update<HeroDbModel>(heroDb);
            _context.SaveChanges();

        }

    }
}

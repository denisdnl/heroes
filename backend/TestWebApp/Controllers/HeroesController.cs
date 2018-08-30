using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestWebApp.Models;
using Microsoft.AspNetCore.SignalR;
using TestWebApp.NotificationsHubs;
using TestWebApp.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestWebApp.Controllers
{
    [Route("api/[controller]")]
    public class HeroesController : Controller
    {
        private INotificationService _notificationService;
        private IHeroesRepository _heroRepository;
        public HeroesController(IHeroesRepository heroRepository, INotificationService notificationService)
        {
            this._notificationService = notificationService;
            this._heroRepository = heroRepository;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Hero> Get()
        {
            return _heroRepository.GetHeroes();

        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Hero Get(int id)
        {
            return _heroRepository.GetHero(id);
        }

        // POST api/<controller>
        [HttpPost]
        public Hero Post([FromBody]Hero value)
        {

            _heroRepository.AddHero(value);
            _notificationService.AddHero(value);
            return value;
        }

        [HttpPut]
        public Hero Put([FromBody]Hero value)
        {
            _heroRepository.UpdateHero(value);
            _notificationService.UpdateHero(value);
            return value;
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        public Hero Delete([FromBody]Hero value)
        {
            _heroRepository.DeleteHero(value.Id);
            _notificationService.DeleteHero(value);
            return value;
        }
    }
}

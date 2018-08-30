import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  hero:Hero;

  constructor(private route: ActivatedRoute,private heroesService:HeroesService,private router:Router) { 
    this.hero = new Hero();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroesService.getHero(id).subscribe(t=>{this.hero = t;},error=>{console.log(error)});
  }

  updateHero(){
    this.heroesService.updateHero(this.hero).subscribe(t=>{this.hero = t;
    this.router.navigateByUrl("/heroes");
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { Hero } from '../models/hero';
import { LoaderService } from '../services/loader.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  private _heroesService:HeroesService;
  private _heroesObservable:Observable<Hero[]>;
  private _heroesSubscription:Subscription;
  private heroes:Hero[];

  private newHero:Hero;
  
  constructor(heroesService:HeroesService, private loaderService:LoaderService) {
    this._heroesService = heroesService;
    this._heroesObservable = this._heroesService.getHeroObservable();
    this.newHero = new Hero();
    this.heroes=[];
   }

   addHero(){
     this._heroesService.addHero(this.newHero);
  }

   removeHero(id){
    this._heroesService.removeHero(id);  
  }

  ngOnInit() {
    this.loaderService.startLoading();

    this._heroesSubscription = this._heroesObservable.subscribe(t=>{this.heroes = t;});
    this._heroesService.getHeroes();

  }

  ngAfterViewInit(){
    this.loaderService.stopLoading();
  }

  ngOnDestroy(){
    this._heroesSubscription.unsubscribe();
  }

}

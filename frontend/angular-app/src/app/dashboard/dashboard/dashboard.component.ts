import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service'
import { Hero } from '../../models/hero';
import { LoaderService } from '../../services/loader.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  _heroesService: HeroesService;
  heroesObs: Observable<Hero[]>;
  heroesSubscription:Subscription;
  heroes: Hero[];

  constructor(heroesServive: HeroesService,private loadingService:LoaderService) { 
    this._heroesService = heroesServive;
    this.heroes = [];
    this.heroesObs = this._heroesService.getHeroObservable();
  }

  ngOnInit() {
    this.loadingService.startLoading();
    this.heroesSubscription = this.heroesObs.subscribe(t=>{this.heroes=t.slice(0,6);});
    this._heroesService.getHeroes();
  }

  ngAfterViewInit(){
    this.loadingService.stopLoading();
  }

  ngOnDestroy(){
    this.heroesSubscription.unsubscribe();
  }

}

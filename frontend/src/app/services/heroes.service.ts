import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../models/hero'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroesService {
  private heroesUrl = 'api/heroes'; 
  private _httpClient:HttpClient;
  private _heroesSubject:Subject<Hero[]>;
  private _heroes:Hero[];

  constructor(http:HttpClient) { 
      this._httpClient = http;
      this._heroesSubject =new Subject<Hero[]>();
      this._heroes;
  }

  getHeroObservable(){
    return this._heroesSubject.asObservable();
  }

  getHeroes(){


      this._httpClient.get<Hero[]>(this.heroesUrl).subscribe(t => {
        this._heroes = t;
        this._heroesSubject.next(this._heroes);
      });

  }


  getHero(id:Number):Observable< Hero > {
    var _observer:Observer<Hero>;
    var observable = new Observable<Hero>((observer) => {
      _observer = observer;
    });

    this._httpClient.get<Hero[]>(this.heroesUrl).subscribe(heroes=>{
      let hero = heroes.filter(t=>t.id===id);
      _observer.next(hero.length>0?hero[0]:new Hero());
      _observer.complete();
    });
    
    return observable;
  }


  removeHero(id){
    this._httpClient.delete<Hero[]>(this.heroesUrl+"/"+id).subscribe();
    this._heroes = this._heroes.filter(t=>t.id !== id);
    this._heroesSubject.next(this._heroes);
  }

  addHero(hero:Hero){
    if(this._heroes === null)
      return;

      this._httpClient.post<Hero>(this.heroesUrl,
        {
          id:this._heroes.length+12,
          name:hero.name,
          owner:hero.owner
        },
        httpOptions).subscribe();

        this._heroes.push({
          id:this._heroes.length+12,
          name:hero.name,
          owner:hero.owner
        });
        this._heroesSubject.next(this._heroes);
  }

  updateHero(hero:Hero):Observable<Hero>{
    return this._httpClient.put<Hero>(this.heroesUrl, hero, httpOptions).pipe(

      catchError(er=>{
          console.log(er.meesage);
          return of(null as Hero);
        })
    );
  }

}

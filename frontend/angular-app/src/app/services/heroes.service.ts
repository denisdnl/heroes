import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../models/hero'
import { HubConnection,HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroesService {
  private heroesUrl = 'https://localhost:44315/api/heroes'; 
  private _httpClient:HttpClient;
  private _heroesSubject:Subject<Hero[]>;
  private _heroes:Hero[];
  private _hubConnection: HubConnection;

  constructor(http:HttpClient) { 
      this._httpClient = http;
      this._heroesSubject =new Subject<Hero[]>();
      this._heroes;
      this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44315/notify")
      .configureLogging(signalR.LogLevel.Information)
      .withHubProtocol("")
      .build();
      this.registerCallbacks();
  }

  getHeroObservable(){
    return this._heroesSubject.asObservable();
  }

  startNotifications(){
     this._hubConnection.start().then();
  }

  private registerCallbacks(){
    this._hubConnection.on("NotifyDeleteHero",(hero:Hero)=>{
      this._heroes = this._heroes.filter(t=>t.id !== hero.id);
      this._heroesSubject.next(this._heroes);
    });

    this._hubConnection.on("NotifyAddHero",(hero:Hero)=>{
      this._heroes.push(hero);
      this._heroesSubject.next(this._heroes);
    });

    this._hubConnection.on("NotifyUpdateHero",(hero:Hero)=>{
      this._heroes = this._heroes.filter(t=>t.id != hero.id);//remove
      this._heroes.push(hero);//and put it back
      this._heroesSubject.next(this._heroes);
    });

  }

  stopNotifications(){
    this._hubConnection.stop().then();
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
    this._httpClient.delete<Hero>(this.heroesUrl+"/"+id).subscribe();
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

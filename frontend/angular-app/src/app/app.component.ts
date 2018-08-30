import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { OnInit } from '@angular/core';
import { HeroesService } from './services/heroes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  activePage = 'dashboardActive';

  constructor(private router: Router, private loadingService:LoaderService,private heroesService:HeroesService){

  }

  changePage(page:string){
    this.activePage = page + 'Active';
    this.router.navigateByUrl('/'+page);
  }

  ngOnInit() {
    this.heroesService.startNotifications();
  }

  ngAfterViewInit(){
    this.loadingService.stopLoading();
  }

  ngOnDestroy(){
    this.heroesService.stopNotifications();
  }

}

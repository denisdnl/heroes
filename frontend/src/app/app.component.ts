import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  activePage = 'dashboardActive';

  constructor(private router: Router, private loadingService:LoaderService){

  }

  changePage(page:string){
    this.activePage = page + 'Active';
    this.router.navigateByUrl('/'+page);
  }
}

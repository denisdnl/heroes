import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }    from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

import { HeroesService } from './services/heroes.service';
import { HeroesComponent } from './heroes/heroes.component';
import { LoaderService } from './services/loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    AppRoutingModule,
    FormsModule      
  ],
  providers: [HeroesService,LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }

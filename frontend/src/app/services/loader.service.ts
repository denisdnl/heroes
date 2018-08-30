import { Injectable } from '@angular/core';

@Injectable(
  
)
export class LoaderService {

  isLoading:boolean = false;

  constructor() { }

  startLoading(){
    this.isLoading = true;
  }

  stopLoading(){
    this.isLoading = false;
  }
}

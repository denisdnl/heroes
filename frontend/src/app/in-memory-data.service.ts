import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', owner:'DCComics' },
      { id: 12, name: 'Narco', owner:'DCComics' },
      { id: 13, name: 'Bombasto', owner:'DCComics' },
      { id: 14, name: 'Celeritas', owner:'DCComics'},
      { id: 15, name: 'Magneta', owner:'Marvel' },
      { id: 16, name: 'RubberMan', owner:'Marvel' },
      { id: 17, name: 'Dynama', owner:'Marvel' },
      { id: 18, name: 'Dr IQ', owner:'Marvel' },
      { id: 19, name: 'Magma', owner:'Marvel' },
      { id: 20, name: 'Tornado', owner:'DCComics' }
    ];
    return {heroes};
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
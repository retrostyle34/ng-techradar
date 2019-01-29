import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class DataStoreService {

   levels: any = [];
   types: any = [];

   constructor() { }

   getLevels() {
      return this.levels;
   }

   setLevels(levels: any[]) {
      this.levels = levels;
   }

   getTypes() {
      return this.types;
   }

   setTypes(types: any[]) {
      this.types = types;
   }

}

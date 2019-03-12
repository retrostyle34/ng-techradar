import { Component, OnInit } from '@angular/core';
import { LevelService } from '../level.service';
import { Level } from '../level';

@Component({
   selector: 'app-level-details',
   templateUrl: './level-details.component.html'
})
export class LevelDetailsComponent implements OnInit {

   selection: boolean = false;

   constructor(private levelService: LevelService) { }

   ngOnInit() {
      this.levelService.activeLevel.subscribe(() => this.selection = true);
      if (this.levelService.getActiveLevel() !== null) {
         this.selection = true;
         console.log("active level is not null");
      }
   }

}

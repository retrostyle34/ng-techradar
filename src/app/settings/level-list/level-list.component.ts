import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-level-list',
   templateUrl: './level-list.component.html',
   styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent implements OnInit {

   title = "Level List";

   constructor(private router: Router) { }

   ngOnInit() {
   }


   onAdd() {
      this.router.navigate(["settings/level/add"]);
   }
}

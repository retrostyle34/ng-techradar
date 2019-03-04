import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

   title: string = 'Levels';


   constructor(private router: Router, private route: ActivatedRoute) { }


   ngOnInit() { }


   ngOnDestroy() {}


   onLevelSelect() {}


   onLevelAdd() {
      this.router.navigate(["settings/level/add"]);
   }


   onLevelDetails() {

   }


   onLevelEdit() {

   }


   onLevelDelete() {

   }
}

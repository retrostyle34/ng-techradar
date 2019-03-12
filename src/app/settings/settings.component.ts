import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-settings',
   templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

   title: string = 'Settings';

   constructor(private router: Router, private route: ActivatedRoute) { }

   ngOnInit() { }

   ngOnDestroy() { }
}

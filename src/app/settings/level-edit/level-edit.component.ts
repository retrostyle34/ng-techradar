import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Level } from '../level';
import { LevelService } from '../level.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-level-edit',
   templateUrl: './level-edit.component.html'
})
export class LevelEditComponent implements OnInit, OnDestroy {

   @ViewChild('formRef') form: NgForm;
   submitted = false;
   level: Level;
   subscription: Subscription = new Subscription();
   editMode = false;

   constructor(private levelService: LevelService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {

      this.subscription = this.levelService.activeLevel.subscribe(
         (level: Level) => {
            console.log("sub");
            
            this.level = level;
            this.editMode = true;
            this.form.setValue({
               name: level.name,
               details: level.details,
               position: level.orderNumber
            });
         }
      );
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

   clearForm() {
      this.form.reset();
   }

}

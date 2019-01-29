import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
   selector: 'app-level-new',
   templateUrl: './level-new.component.html',
   styleUrls: ['./level-new.component.scss']
})
export class LevelNewComponent implements OnInit {

   level: any;
   @ViewChild('f') form: NgForm;

   constructor(private router: Router) { }

   ngOnInit() {
   }

   onSubmit() {
      
   }

   onClear() {
      this.form.reset();
   }

   onCancel() {
      this.form.reset();
      this.router.navigate(['settings/levels']);
   }


}

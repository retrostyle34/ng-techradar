import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LevelService } from '../level.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-level-add',
   templateUrl: './level-add.component.html'
})
export class LevelAddComponent implements OnInit, OnDestroy {

   level: any;
   mode: number = 0;
   @ViewChild('formRef') form: NgForm;
   @Input() name: string;
   subscription: Subscription = new Subscription();

   constructor(private levelService: LevelService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() { }

   ngOnDestroy(): void {
      this.subscription.unsubscribe();
   }

   onSubmit() {
      this.form.controls['name'].markAsPending();
      this.level = this.form.value;
      this.subscription = this.levelService.addLevel(this.level).subscribe(
         () => {
            this.levelService.getLevels();
            this.form.reset();
            this.levelService.reset();
            this.router.navigate(['/settings/levels'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
         }, error => console.log("error log")
      );
   }

   onClear() {
      this.form.reset();
   }

   onCancel() {
      this.form.reset();
      this.levelService.reset();
      this.router.navigate(['settings/levels']);
   }
}

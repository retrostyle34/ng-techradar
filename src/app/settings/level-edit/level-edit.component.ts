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

    level: Level;
    mode: number = 0;
    @ViewChild('formRef') form: NgForm;
    subscription: Subscription = new Subscription();

    constructor(private levelService: LevelService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscription = this.levelService.activeLevel.subscribe(
            (level: Level) => {
                this.level = level;
                this.form.setValue({
                    name: level.name,
                    position: level.orderNumber,
                    details: level.details,
                 });
            }, error => console.log(error)
        );

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit() {

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

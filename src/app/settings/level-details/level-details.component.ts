import { Component, OnInit, OnDestroy } from '@angular/core';
import { LevelService } from '../level.service';
import { Level } from '../level';
import { Subscribable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-level-details',
    templateUrl: './level-details.component.html'
})
export class LevelDetailsComponent implements OnInit, OnDestroy {


    selection: boolean = false;
    selectedLevel: Level;
    levels: Level[];
    levelsSubscription: Subscription = new Subscription();
    levelSubscription: Subscription = new Subscription();

    constructor(private levelService: LevelService, private router: Router) { }

    ngOnInit() {
        this.levelsSubscription = this.levelService.activeLevels.subscribe(
            (levels: Level[]) => {
                this.levels = levels;
                this.detectSelection();
            }
        );
        this.levelSubscription = this.levelService.activeLevel.subscribe(
            (level: Level) => {
                this.selection = true;
            }
        );
    }

    ngOnDestroy(): void {
        this.levelsSubscription.unsubscribe();
        this.levelSubscription.unsubscribe();
    }


    detectSelection() {
        let url = this.router.url;
        let id: string = url.substring(url.lastIndexOf('/')+1);
        let x: number = +id;
        if(x > 0) {
            let level: Level = this.levels.find(f => f.id === x);
            if(level !== undefined) {
                console.log("found selection");
                
                this.selection = true;
            } else {
                this.selection = false;
            }
        }
        console.log("Selected Level: "+ id);
    }

}

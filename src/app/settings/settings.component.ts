import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from './level';
import { Subscription } from 'rxjs';
import { LevelService } from './level.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {

    title: string = 'Settings';
    levels: Level[] = [];
    selectedLevel: Level;
    mode: number = 0;
    levelsSubscription: Subscription = new Subscription();
    levelSubscription: Subscription = new Subscription();
    modeSubscription: Subscription = new Subscription();

    constructor(private levelService: LevelService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.levels = this.levelService.getLevels();
        this.levelsSubscription = this.levelService.activeLevels.subscribe(
            (levels: Level[]) => {
                this.levels = levels;
                this.detectSelection();
            }
        );
        this.modeSubscription = this.levelService.activeMode.subscribe(
            (mode: number) => this.mode = mode
        );
        this.levelSubscription = this.levelService.activeLevel.subscribe(
            (level: Level) => {
                this.selectedLevel = level;
            }
        );
        this.detectMode();
    }


    ngOnDestroy() {
        console.log('Unsubscribe all from level list');
        this.levelService.reset();
        this.levelsSubscription.unsubscribe();
        this.modeSubscription.unsubscribe();
    }


    onSelect(level: Level) {
        this.detectMode();
        this.selectedLevel = level;
        this.levelService.setActiveLevel(level);
        switch (this.mode) {
            case 0: console.log("selected level: " + level.id); break;
            case 1: break;
            case 2: this.router.navigate([`/settings/levels/details/${level.id}`]); break;
            case 3: this.router.navigate([`/settings/levels/edit/${level.id}`]); break;
            default: console.log("selected level: " + level.id); break;
        }
    }


    onLevelAdd() {
        if (this.mode !== 1) {
            this.levelService.activeMode.next(1);
            this.router.navigate(['/settings/levels/add']);
            console.log("On Add");
        } else {
            this.levelService.activeMode.next(0);
            this.router.navigate(['/settings/levels']);
        }
    }

    onLevelDetails() {
        if (this.mode !== 2) {
            this.levelService.activeMode.next(2);
            if (this.selectedLevel != null) {
                console.log('level id: ' + this.selectedLevel.id);
                this.levelService.activeLevel.next(this.selectedLevel);
                this.router.navigate(['/settings/levels/details/' + this.selectedLevel.id]);
            } else {
                this.router.navigate(['/settings/levels/details']);
            }
        } else {
            this.levelService.activeMode.next(0);
            this.router.navigate(['/settings/levels']);
        }
    }


    onLevelEdit() {
        if (this.mode !== 3) {
            this.levelService.activeMode.next(3);
            if (this.selectedLevel != null) {
                console.log('level id: ' + this.selectedLevel.id);
                this.levelService.activeLevel.next(this.selectedLevel);
                this.router.navigate(['/settings/levels/edit/' + this.selectedLevel.id]);
            }
        } else {
            this.levelService.activeMode.next(0);
            this.router.navigate(['/settings/levels']);
        }
    }


    onDelete(id: string) {
        console.log(id);
        this.levelService.deleteLevel(id).subscribe(
            () => this.levelService.getLevels()
        );
    }

    onWarning() {
        console.log("Warning");
    }

    detectMode() {
        let url = this.router.url;
        if (url.includes("details")) {
            this.mode = 2;
        } else if (url.includes("edit")) {
            this.mode = 3;
        } else if (url.includes("add")) {
            this.mode = 1;
        } else {
            this.mode = 0;
        }
        this.levelService.activeMode.next(this.mode);
    }

    detectSelection() {
        // let urlGroup: UrlTree = this.router.parseUrl(url);
        // let segment: UrlSegment[] = urlGroup.root.children[PRIMARY_OUTLET].segments;
        // console.log(segment[segment.length-1].path);

        let url = this.router.url;
        let id: string = url.substring(url.lastIndexOf('/') + 1);
        let x: number = +id;
        if (x > 0) {
            let level: Level = this.levels.find(f => f.id === x);
            if (level !== undefined) {
                this.levelService.activeLevel.next(level);
            } else {
                this.levelService.activeMode.next(0);
                this.router.navigate(["/settings/levels"]);
            }
        }
        console.log("Selected Level: " + id);
    }
}

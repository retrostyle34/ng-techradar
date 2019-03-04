import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from '../level';
import { LevelService } from '../level.service';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-level-list',
   templateUrl: './level-list.component.html',
   styleUrls: ['./level-list.component.scss']
})
export class LevelListComponent implements OnInit {

   title = "Level List";
   levels: Level[] = [];
   level: Level;
   selectedLevel: number;
   mode: number = 0;
   levelsSubscription: Subscription;
   modeSubscription: Subscription;
   selectedLevelSubscription: Subscription;

   constructor(private levelService: LevelService, private router: Router, private route: ActivatedRoute) { }

   ngOnInit() {
      this.levels = this.levelService.getLevels();
      this.levelsSubscription = this.levelService.activeLevels.subscribe(
         (levels: Level[]) => this.levels = levels
      );
      this.modeSubscription = this.levelService.activeMode.subscribe(
         (mode: number) => this.mode = mode 
      );
      this.selectedLevelSubscription = this.levelService.activeLevel.subscribe(
         (level: Level) => this.selectedLevel = +level.id
      );
      
      // Subscribe and redirect if there is any id used
      this.route.data.subscribe(
         (data: any) => {
            var id = this.route.snapshot.params['id'];
            console.log('id subscription: '+id);
            if(id != undefined) {
               console.log('navigate');
               this.levelService.activeLevel.next(this.levelService.getLevel(id));
               // this.router.navigate(["/levels"]);
            }
         }
      );
   }


   ngOnDestroy() {
      console.log('unsubscribe all');
      this.levelsSubscription.unsubscribe();
      this.modeSubscription.unsubscribe();
      this.selectedLevelSubscription.unsubscribe();
   }


   onSelect(level: Level) {
      this.selectedLevel = level.id;
      this.level = level;
      
      this.levelService.setActiveLevel(level);
      switch (this.mode) {
         case 0: console.log("selected level: "+ level.id); break;
         case 1: this.router.navigate([`/levels/add`]); break;
         case 2: this.router.navigate([`/levels/details/${level.id}`]); break;
         case 3: this.router.navigate([`/levels/edit/${level.id}`]); break;
         default: console.log("selected level: "+ level.id); break;
      }
   }


   onAdd() {
      this.mode = (this.mode==1) ? 0 : 1;
      if(this.mode==1) {
         this.levelService.activeMode.next(1);
         this.router.navigate(['/levels/add']);
         console.log("On Add");
      } else {
         this.router.navigate(['/levels']);
      }
   }


   onDetails() {
      this.mode = (this.mode==2) ? 0 : 2;
      
      if(this.mode==2) {
         this.levelService.activeMode.next(2);
         if(this.level != null) {
            console.log('level id: '+ this.level.id);
            this.levelService.activeLevel.next(this.level);
            this.router.navigate(['/levels/details/'+this.level.id]);
         }
      } else {
         this.router.navigate(['/levels']);
      }
   }
   

   onEdit() {
      this.mode = (this.mode==3) ? 0 : 3;
      if(this.mode==3) {
         this.levelService.activeMode.next(3);
         if(this.level != null) {
            console.log('level id: '+ this.level.id);
            this.levelService.activeLevel.next(this.level);
            this.router.navigate(['/levels/edit/'+this.level.id]);
         }
      } else {
         this.router.navigate(['/levels']);
      }
   }


   onDelete(id: string) {
      console.log(id);
      this.levelService.deleteLevel(id).subscribe(
         _ => this.levelService.getLevels()
      );
   }
}

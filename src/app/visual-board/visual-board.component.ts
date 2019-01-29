import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../items/item.service';
import { Item } from '../items/item';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-visual-board',
   templateUrl: './visual-board.component.html',
   styleUrls: ['./visual-board.component.scss']
})
export class VisualBoardComponent implements OnInit, OnDestroy {

   title = "Visual Board";

   items: Item[];
   levels: any = [1,2,3,4,5];

   sizeX = 400;
   sizeY = 400;
   viewBox = "0 0 " + this.sizeX + " " + this.sizeY;
   columnDefs = [{ headerName: 'Name', field: 'name' }];
   radarColor: any = ['#6e89ad','#728eb2','#7995b9','#7f99bb','#88a1c2', 
                      '#91a8c7','#9bb1ce','#a4b9d4','#afc1da','#b4c5db'];

   // radarColor: any = ['#8ad2fc', '#76bee8', '#63afdb', '#529fca', '#418eb9', '#3a87b2', '#317faa',
   //    '#2876a0', '#1e6d99', '#1a6791', '#15628c', '#125c84', '#0e5882', '#0b537c', '#054b72', '#014166'];
   // radarColor: any = ['#5b5755', '#686462', '#746f6d', '#7e7977', '#888482', '#3a87b2', '#317faa',
   //    '#2876a0', '#1e6d99', '#1a6791', '#15628c', '#125c84', '#0e5882', '#0b537c', '#054b72', '#014166'];
   // radarColor_deep_blue: any = [
   //    '#91959e','#979da7','#9ba2ad','#9da5b3','#9fa9bb','#3a87b2','#317faa','#2876a0',
   //    '#1e6d99','#1a6791','#15628c','#125c84','#0e5882','#0b537c','#054b72','#014166'];
   
   
   positionX: any = [150, 200, 360, 75, 290, 350, 260, 80,];
   positionY: any = [150, 240, 360, 320, 170, 70, 320, 230];
   radius = 12;
   activeItem: any;
   selectedItem: number;
   itemSubscription: Subscription;

   constructor(public itemService: ItemService,
      private route: ActivatedRoute,
      private router: Router) { }


   ngOnInit() {
      this.itemSubscription = this.itemService.activeItems.subscribe(
         (items: Item[]) => {
            this.items = items;
      });
      
      this.route.data.subscribe(
         (data: any) => {
            var id = this.route.snapshot.params['id'];
            console.log(id);
            
            if(id != undefined) {
               this.itemService.getItem(id);
            }
            console.log('mode subscription: '+data['mode']);
         }
      );
   }


   ngOnDestroy() {
      console.log('unsubscribe all from VB');
      this.itemSubscription.unsubscribe();
   }


   // getItems() {
   //    this.itemService.getItems().subscribe((data: Item) => {
   //       console.log('Get items call from Visual Board');
   //       this.items = this.itemService.getItems();
   //    });
   // }


   // private getLevels() {
   //    this.itemService.getLevels().subscribe((data: {}) => {
   //       this.levels = data;
   //       console.log("Levels: " + this.levels);
   //    });
   // }


   onSelect(item: Item) {
      this.router.navigate(['/items/details/' + item.id]);
      this.activeItem=item.id;
      this.selectedItem = item.id;
      this.itemService.setActiveItem(item);
   }

   // showDetails(id: string) {
   //    console.log("show details");
   //    this.router.navigate(['/items/details/' + id]);
   // }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-item-list',
   templateUrl: './item-list.component.html',
})
export class ItemListComponent implements OnInit, OnDestroy {

   title: string = 'Item List';
   items: Item[] = [];
   item: Item;
   deleteEvent: boolean = false;
   selectedItem: number;
   mode: number = 0;
   itemsSubscription: Subscription;
   modeSubscription: Subscription;
   selectedItemSubscription: Subscription;
   selectionNotification: boolean = false;


   constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }


   ngOnInit() {
      this.items = this.itemService.getItems();
      this.itemsSubscription = this.itemService.activeItems.subscribe(
         (items: Item[]) => {
            this.items = items;
      });
      this.modeSubscription = this.itemService.activeMode.subscribe(
         (mode: number) => { 
            this.mode = mode;
            this.selectedItemSubscription = this.itemService.activeItem.subscribe(
               (item: Item) => {
                  this.selectedItem = +item.id;
               }
            );
         }
      );
      
      
      // Subscribe and redirect if there is any id used
      this.route.data.subscribe(
         (data: any) => {
            var id = this.route.snapshot.params['id'];
            console.log('id subscription: '+id);
            if(id != undefined) {
               console.log('navigate');
               this.itemService.activeItem.next(this.itemService.getItem(id));
               // this.router.navigate(["/items"]);
            }
         }
      );
      
   }


   ngOnDestroy() {
      console.log('unsubscribe all');
      this.itemsSubscription.unsubscribe();
      this.modeSubscription.unsubscribe();
      this.selectedItemSubscription.unsubscribe();
   }


   onSelect(item: Item) {
      this.selectedItem = item.id;
      this.item = item;
      if(this.mode == 0) {
         console.log("selected item: "+ item.id);
         this.itemService.setActiveItem(item);
      } else if(this.mode == 1) {
         this.itemService.activeMode.next(3);
         this.router.navigate([`/items/edit/${item.id}`]);
      } else if(this.mode == 2) {
         this.itemService.setActiveItem(item);
         this.router.navigate([`/items/details/${item.id}`]);
      } else if(this.mode == 3) {
         this.itemService.setActiveItem(item);
         this.router.navigate([`/items/edit/${item.id}`]);
      }
   }


   onAdd() {
      this.mode = (this.mode==1) ? 0 : 1;
      if(this.mode==1) {
         this.itemService.activeMode.next(1);
         this.router.navigate(['/items/add']);
      } else {
         this.router.navigate(['/items']);
      }
   }


   onDetails() {
      this.mode = (this.mode==2) ? 0 : 2;
      
      if(this.mode==2) {
         this.itemService.activeMode.next(2);
         if(this.item != null) {
            console.log('item id: '+ this.item.id);
            this.itemService.activeItem.next(this.item);
            this.router.navigate(['/items/details/'+this.item.id]);
         }
      } else {
         this.router.navigate(['/items']);
      }
   }
   

   onEdit() {
      this.mode = (this.mode==3) ? 0 : 3;
      if(this.mode==3) {
         this.itemService.activeMode.next(3);
         if(this.item != null) {
            console.log('item id: '+ this.item.id);
            this.itemService.activeItem.next(this.item);
            this.router.navigate(['/items/edit/'+this.item.id]);
         }
      } else {
         this.router.navigate(['/items']);
      }
   }


   onDelete(id: string) {
      console.log(id);
      this.itemService.deleteItem(id).subscribe(
         _ => this.itemService.getItems()
      );
   }
}

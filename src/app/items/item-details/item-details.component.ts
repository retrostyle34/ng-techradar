import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { log } from 'util';

@Component({
   selector: 'app-item-details',
   templateUrl: './item-details.component.html',
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

   title: string = "Item Details";
   item: Item = new Item(0, '','','','','');
   @ViewChild('f') form: NgForm;
   mode: number = 0;
   subscription: Subscription;


   constructor(private itemService: ItemService, private route: ActivatedRoute) { }


   ngOnInit() {
      this.route.data.subscribe(
         (data: any) => { 
            this.title = data['title']; 
            this.itemService.activeMode.next(data['mode']);
            console.log('mode subscription: '+data['mode']);
            var id = this.route.snapshot.params['id'];
            console.log('details id: '+id);
            this.itemService.getItem(id);
         }
      );
      this.subscription = this.itemService.activeItem.subscribe(
         (item: Item) => {
            this.item = item;
         }
      );
   }


   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

}

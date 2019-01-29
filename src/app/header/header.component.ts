import { Component, OnInit } from '@angular/core';
import { ItemService } from '../items/item.service';
import { Item } from '../items/item';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   title = "TECHRADAR";
   gear = "&#xf013;";

   constructor(private itemService: ItemService) { }

   ngOnInit() {
   }

   reset() {
      this.itemService.activeMode.next(0);
   }
}

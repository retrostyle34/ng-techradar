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
    selectedItem: Item;
    deleteEvent: boolean = false;
    mode: number = 0;
    itemsSubscription: Subscription;
    modeSubscription: Subscription;
    selectedItemSubscription: Subscription;
    selectionNotification: boolean = false;


    constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }


    ngOnInit() {
        this.items = this.itemService.getItems();
        this.itemsSubscription = this.itemService.activeItems.subscribe(
            (items: Item[]) => this.items = items
        );
        this.modeSubscription = this.itemService.activeMode.subscribe(
            (mode: number) => this.mode = mode
        );
        this.selectedItemSubscription = this.itemService.activeItem.subscribe(
            (item: Item) => this.selectedItem = item
        );

        // Subscribe and redirect if there is any id used
        this.route.data.subscribe(
            (data: any) => {
                console.log("data");
                console.log(data);
                const id = +this.route.snapshot.paramMap.get('id');
                console.log(id);
                
                // var id = this.route.snapshot.params['id'];
                // console.log('id subscription: ' + id);
                // if (id != undefined) {
                //     console.log('navigate');
                //     this.itemService.activeItem.next(this.itemService.getItem(id));
                //     // this.router.navigate(["/items"]);
                // }
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
        //   this.selectedItem = item;
        // this.item = item;

        this.itemService.setActiveItem(item);
        switch (this.mode) {
            case 0: console.log("selected item: " + item.id); break;
            case 1: this.router.navigate([`/items/add`]); break;
            case 2: this.router.navigate([`/items/details/${item.id}`]); break;
            case 3: this.router.navigate([`/items/edit/${item.id}`]); break;
            default: console.log("selected item: " + item.id); break;
        }
    }


    onAdd() {
        this.mode = (this.mode == 1) ? 0 : 1;
        if (this.mode == 1) {
            this.itemService.activeMode.next(1);
            this.router.navigate(['/items/add']);
            console.log("On Add");
        } else {
            this.router.navigate(['/items']);
        }
    }


    onDetails() {
        this.mode = (this.mode == 2) ? 0 : 2;

        if (this.mode == 2) {
            this.itemService.activeMode.next(2);
            if (this.selectedItem != null) {
                console.log('item id: ' + this.selectedItem.id);
                this.itemService.activeItem.next(this.selectedItem);
                this.router.navigate(['/items/details/' + this.selectedItem.id]);
            }
        } else {
            this.router.navigate(['/items']);
        }
    }


    onEdit() {
        this.mode = (this.mode == 3) ? 0 : 3;
        if (this.mode == 3) {
            this.itemService.activeMode.next(3);
            if (this.selectedItem != null) {
                console.log('item id: ' + this.selectedItem.id);
                this.itemService.activeItem.next(this.selectedItem);
                this.router.navigate(['/items/edit/' + this.selectedItem.id]);
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

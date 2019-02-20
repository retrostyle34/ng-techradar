import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ItemService } from '../item.service';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../item';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-item-edit',
   templateUrl: './item-edit.component.html',
})
export class ItemEditComponent implements OnInit, OnDestroy {

   title: string = 'New Item';

   @ViewChild('f') form: NgForm;
   submitted = false;
   item : Item; 
   subscription: Subscription;
   editMode = false;


   constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }


   ngOnInit() {
      this.route.data.subscribe(
         (data: any) => {
            this.title = data['title'];
            this.itemService.activeMode.next(data['mode']);
            console.log("Mode: " + data['mode']);
            
            if(data['mode']==3) {
               var id = this.route.snapshot.params['id'];
               this.itemService.getItem(id);

               this.subscription = this.itemService.activeItem.subscribe(
                  (item: Item) => {
                     this.item = item;
                     this.editMode = true;
                     this.form.setValue({
                        name: item.name,
                        level: item.level,
                        type: item.type,
                        details: item.details,
                     });
                  }
               );
            }
            console.log('mode subscription: '+data['mode']);
         }
      );
      
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }


   onSubmit() {
      this.item = this.form.value;
      this.itemService.addItem(this.item).subscribe(
         _ => this.itemService.getItems()
      );
      this.form.reset();
      this.itemService.reset();
      this.router.navigate(['/items'],{relativeTo: this.route, queryParamsHandling: 'preserve'});
   }


   clearForm() {
      this.form.reset();
   }
   
   
   resetItem() {
      this.itemService.reset();
   }
   
   
   onCancel() {
      this.form.reset();
      this.itemService.reset();
      this.router.navigate(['/items'],{relativeTo: this.route, queryParamsHandling: 'preserve'});
   }

}
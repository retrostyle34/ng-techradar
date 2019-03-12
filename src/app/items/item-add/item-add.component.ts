import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../item';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html'
})
export class ItemAddComponent implements OnInit {

   title: string = 'New Item';
   @ViewChild('formRef') form: NgForm;
   submitted = false;
   item : Item; 
   subscription: Subscription;
   editMode = false;


   constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) { }


   ngOnInit() {
      this.subscription = this.route.data.subscribe(
         (data: any) => {
            this.title = data['title'];
            this.itemService.activeMode.next(data['mode']);
            console.log("Mode: " + data['mode']);
         }
      );
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }


   onSubmit() {
      this.submitted = true;
      this.item = this.form.value;
      this.itemService.addItem(this.item).subscribe(
         () => {
            setTimeout(() => {
               this.itemService.getItems();
               this.form.reset();
               this.itemService.reset();
               this.router.navigate(['/items'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
               this.submitted = false;
            }, 2000);
         }
      );
   }


   clearForm() {
      this.form.reset();
   }
   
   
   resetItem() {
      this.itemService.reset();
   }
   
   
   onCancel() {
      console.log(this.form);
      
      this.form.reset();
      this.itemService.reset();
      this.router.navigate(['/items'],{relativeTo: this.route, queryParamsHandling: 'preserve'});
   }

}
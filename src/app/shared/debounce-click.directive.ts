import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, debounce } from 'rxjs/operators';

@Directive({
   selector: '[debounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
   @Input('debounceTime') debounceTime: number = 5000;
   @Output('debounceClick') debounceClick = new EventEmitter();
   private clicks = new Subject();
   private subscription: Subscription = new Subscription();
   private firstEvent: boolean = true;

   constructor() {}
   
   ngOnInit() {
      this.firstEvent = true;
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

   @HostListener('click', ['$event'])
   clickEvent(event) {
      console.log(this.debounceTime);
      if(this.firstEvent) {
         this.firstEvent = false;
         this.clicks.next(event);
         console.log("first event");
         this.subscription = this.clicks.pipe(
            debounceTime(this.debounceTime)
         ).subscribe(e => this.debounceClick.emit(e));
         
      } else {
         event.preventDefault();
         event.stopPropagation();
         this.clicks.next(event);
         console.log("notfirst event");
      } 
   }
}
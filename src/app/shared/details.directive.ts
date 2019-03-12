import { Directive, Output, EventEmitter, HostListener, Input, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Directive({
   selector: '[detailsMode]'
 })
export class DetailsDirective implements OnInit, OnDestroy {
   @Input('detailsSection') section: string;
   @Input('detailsMode') mode: string;
   @Input('detailsIcon') icon: string;
   subscription: Subscription = new Subscription();

   constructor(private router: Router, private element: ElementRef) {}

   ngOnInit() {
      let url = this.router.url;
      this.setStyle(url);
      console.log("Section: " + this.section + " / "+ this.mode);
      
      this.subscription = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(
         (res: any) => {
            console.log("details subscription");
            this.setStyle(res.url);
         }
      )
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

   private setStyle(url: string) {
      if(url.includes(this.mode)) {
         this.element.nativeElement.classList.add("list-mode-active");
      } else {
         this.element.nativeElement.classList = this.icon + " list-mode";
      }
   }

}
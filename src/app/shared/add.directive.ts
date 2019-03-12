import { Directive, Output, EventEmitter, HostListener, Input, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Directive({
   selector: '[listMode]'
 })
export class AddDirective implements OnInit, OnDestroy {
   @Input('listSection') section: string;
   @Input('listMode') mode: string;
   @Input('listIcon') icon: string;
   subscription: Subscription = new Subscription();


   constructor(private router: Router, private element: ElementRef) {}

   ngOnInit() {
      let url = this.router.url;
      this.setStyle(url);
      console.log("Section: " + this.section);
      console.log("Mode: " + this.mode);
      
      // console.log(url + " - " + !url.includes(this.section + "/add"));
      
      this.subscription = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(
         (res: any) => {
            console.log("subscription");
            this.setStyle(res.url);
         }
      )
   }

   @HostListener('click')
   handleClick() {
      console.log("Section: " + this.section);
      
      if(this.section !== undefined) this.navigate();
   }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }


   private navigate() {
      let url = this.router.url;
      console.log("X:" + url);
      
      if(!url.includes(this.section + "/" + this.mode)) {
         console.log("1. Navigate to: " + url);
         url = url.substring(0, url.lastIndexOf(this.section)) + this.section + "/" + this.mode;
      } else {
         url = url.substring(0, url.lastIndexOf(this.section)) +"/"+ this.section;
      }
      console.log("Navigate to: " + url);
      this.router.navigate([url]);
   }

   private setStyle(url: string) {
      if(url.includes(this.mode)) {
         this.element.nativeElement.classList.add("list-mode-active");
      } else {
         this.element.nativeElement.classList = this.icon + " list-mode";
      }
   }

}
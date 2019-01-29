import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[listmode]'
})
export class ListmodeDirective {

    @HostBinding('class.selected') isSelected = false;

    constructor() { }

    @HostListener('click') tobbleOpen() {
       this.isSelected = !this.isSelected; 
    }

}
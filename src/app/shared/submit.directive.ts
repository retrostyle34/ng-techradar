import { Directive, Output, EventEmitter, HostListener } from "@angular/core";
import { NgForm } from "@angular/forms";

@Directive({
   selector: '[tsSubmitIfValid]'
 })
export class SubmitIfValidDirective {
   @Output('tsSubmitIfValid') valid = new EventEmitter<void>();

   constructor(private formRef: NgForm) {}

   @HostListener('click')
   handleClick() {
      this.markFieldsAsDirty();
      this.emitIfValid();
   }

   private markFieldsAsDirty() {
      Object.keys(this.formRef.controls).forEach(
         fieldName => this.formRef.controls[fieldName].markAsDirty()
      );
   }

   private emitIfValid() {
      if (this.formRef.valid) {
         this.valid.emit();
      }
   }
}
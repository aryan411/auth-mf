import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStrengthDirective,
      multi: true
    }
  ]
})
export class PasswordStrengthDirective implements Validator {
  @Input('appPasswordStrength') minLength: number = 6;
  private hasUppercase = /[A-Z]/;
  private hasNumber = /\d/;
  private hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value || '';

    // validation conditions
    const meetsLength = value.length >= this.minLength;
    const meetsUppercase = this.hasUppercase.test(value);
    const meetsNumber = this.hasNumber.test(value);
    const meetsSpecialChar = this.hasSpecialChar.test(value);

    const valid = meetsLength && meetsUppercase && meetsNumber && meetsSpecialChar;
    
    // CSS class based on validity
    if (!valid) {
      this.renderer.addClass(this.el.nativeElement, 'weak-password');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'weak-password');
    }
    
    return valid ? null : { weakPassword: true };
  }
}

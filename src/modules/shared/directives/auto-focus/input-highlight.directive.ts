import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputHighlight]',
})
export class InputHighlightDirective {
  @Input('appInputHighlight') autoFocus: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Automatically focus the input if autoFocus is true
    if (this.autoFocus) {
      this.el.nativeElement.focus();
    }
  }
}

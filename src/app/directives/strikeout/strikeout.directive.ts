import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStrikeout]'
})
export class StrikeoutDirective {
  @Input('appStrikeout') set checked(value: boolean) {
    this.el.nativeElement.classList.add('strikeable');
    if(value) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      let line = this.renderer.createElement('div');
      this.renderer.setStyle(line, 'position', 'absolute');
      this.renderer.setStyle(line, 'width', '100%');
      this.renderer.setStyle(line, 'height', '1px');
      this.renderer.setStyle(line, 'background', 'black');
      this.renderer.setStyle(line, 'top', '50%');
      this.renderer.appendChild(this.el.nativeElement, line);
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }
}

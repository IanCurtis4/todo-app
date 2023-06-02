import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { PriorityLevel } from '../../models/priority-level.model';

@Directive({
  selector: '[appPriorityColor]'
})
export class PriorityColorDirective implements OnChanges {

  @Input('appPriorityColor') priority: PriorityLevel = PriorityLevel.NONE;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    const colors = this.getColors(8); // get the colors array
    this.renderer.setStyle(this.el.nativeElement, 'background-color', colors[this.priority] || '#ffffff');
  }

  ngOnInit() {
    const colors = this.getColors(8);
    this.el.nativeElement.style.backgroundColor = colors[this.priority];
  }

  getColors(n: number): string[] {

    let colors = [];

    const maxRGBValue = 255;

    const minColorValue = 33;

    const maxColorValue = maxRGBValue - minColorValue;

    for(let i = 1; i <= n + 1; i++) {

      let r = Math.max(minColorValue, Math.ceil(maxRGBValue * i / n + 1));
      let g = Math.max(minColorValue, maxRGBValue - (Math.ceil(maxRGBValue * i / n + 1)));
      let b = minColorValue;

      colors.push(`rgb(${r}, ${g}, ${b})`);

    }

    return colors;

  }

}

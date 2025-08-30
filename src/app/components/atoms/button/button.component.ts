import { Component, ElementRef, Input, Renderer2 } from '@angular/core';

@Component({
    selector: `Button`,
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
    standalone: false
})
export class ButtonComponent {
  @Input('type') type!: 'primary' | 'secondary';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const el = this.elementRef.nativeElement;
    // console.log(this.elementRef);

    if (!el) {
      return;
    }

    if (this.type) this.renderer.addClass(el, 'ml--' + this.type);
    // if (this.size) this.renderer.addClass(el, 'ml--' + this.size);
  }
}
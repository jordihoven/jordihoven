import { Component, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'Icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})

export class IconComponent {
  @Input('feather-icon')
  featherIcon: string = 'home';

  @Input('type') type!: 'hasIcon';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const el = this.elementRef.nativeElement;

    if (!el) {
      return;
    }

    if (this.type) this.renderer.addClass(el, 'ml--' + this.type);
  }
}
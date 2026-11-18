import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideImageOff } from '@lucide/angular';

@Component({
  selector: 'app-cartridge',
  imports: [LucideImageOff],
  templateUrl: './cartridge.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cartridge.component.css',
})
export class CartridgeComponent {
  @Input() cover: string = '';
  @Input() fallback: string = '';
  depth = [8, 7, 6, 5, 4, 3, 2, 1];

  // portrait cover missing: try landscape header, then give up and show placeholder
  coverError(img: HTMLImageElement) {
    if (this.fallback && img.src !== this.fallback) img.src = this.fallback;
    else img.hidden = true;
  }
}

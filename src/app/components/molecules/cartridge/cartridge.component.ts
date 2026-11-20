import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideImageOff } from '@lucide/angular';
import { CoverDirective } from '../../../directives/cover.directive';

@Component({
  selector: 'app-cartridge',
  imports: [LucideImageOff, CoverDirective],
  templateUrl: './cartridge.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cartridge.component.css',
})
export class CartridgeComponent {
  @Input() cover: string = '';
  @Input() fallback: string = ''; // landscape header, used when portrait cover is missing
  depth = [8, 7, 6, 5, 4, 3, 2, 1];
}

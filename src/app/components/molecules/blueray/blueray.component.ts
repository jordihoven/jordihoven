import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideImageOff } from '@lucide/angular';
import { CoverDirective } from '../../../directives/cover.directive';

@Component({
  selector: 'app-blueray',
  imports: [LucideImageOff, CoverDirective],
  templateUrl: './blueray.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blueray.component.css',
})
export class BluerayComponent {
  @Input() poster: string = '';
}

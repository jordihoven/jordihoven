import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-blueray',
  imports: [],
  templateUrl: './blueray.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './blueray.component.css',
})
export class BluerayComponent {
  @Input() poster: string = '';
}

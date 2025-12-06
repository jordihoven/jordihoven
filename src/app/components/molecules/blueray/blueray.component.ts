import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blueray',
  imports: [],
  templateUrl: './blueray.component.html',
  styleUrl: './blueray.component.css',
})
export class BluerayComponent {
  @Input() poster: string = '';
}

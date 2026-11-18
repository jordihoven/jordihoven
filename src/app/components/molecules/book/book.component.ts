import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideImageOff } from '@lucide/angular';

@Component({
  selector: 'app-book',
  imports: [LucideImageOff],
  templateUrl: './book.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() cover: string = '';
  loaded = false;
}

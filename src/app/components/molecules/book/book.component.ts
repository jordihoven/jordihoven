import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideImageOff } from '@lucide/angular';
import { CoverDirective } from '../../../directives/cover.directive';

@Component({
  selector: 'app-book',
  imports: [LucideImageOff, CoverDirective],
  templateUrl: './book.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() cover: string = '';
}

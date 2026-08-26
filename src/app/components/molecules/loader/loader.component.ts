import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LucideLoader } from '@lucide/angular';

@Component({
  selector: 'app-loader',
  imports: [LucideLoader],
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './loader.component.css',
})
export class LoaderComponent {}

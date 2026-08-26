import { Component } from '@angular/core';
import { LucideLoader } from '@lucide/angular';

@Component({
  selector: 'app-loader',
  imports: [LucideLoader],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {}

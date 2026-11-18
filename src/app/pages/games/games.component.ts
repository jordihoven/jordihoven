import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LucideImageOff } from '@lucide/angular';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { SteamGame } from '../../models/data-models';

@Component({
  selector: 'app-games',
  imports: [LoaderComponent, DatePipe, LucideImageOff],
  templateUrl: './games.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './games.component.css',
})
export class GamesComponent {
  games: SteamGame[] = [];

  openGame(url: string) { window.open(url, '_blank'); }

  // portrait cover missing: try landscape header, then give up and show placeholder
  coverError(img: HTMLImageElement, fallback: string) {
    if (img.src !== fallback) img.src = fallback;
    else img.hidden = true;
  }

  async ngOnInit() {
    try {
      const res = await fetch('/.netlify/functions/steam-data');
      this.games = await res.json();
    } catch (error) {
      console.error(error);
    }
  }
}

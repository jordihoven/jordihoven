import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { SteamGame } from '../../models/data-models';

@Component({
  selector: 'app-games',
  imports: [LoaderComponent, DatePipe],
  templateUrl: './games.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './games.component.css',
})
export class GamesComponent {
  games: SteamGame[] = [];

  openGame(url: string) { window.open(url, '_blank'); }

  async ngOnInit() {
    try {
      const res = await fetch('/.netlify/functions/steam-data');
      this.games = await res.json();
    } catch (error) {
      console.error(error);
    }
  }
}

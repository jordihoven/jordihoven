import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CartridgeComponent } from '../../components/molecules/cartridge/cartridge.component';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { SteamGame } from '../../models/data-models';
import { getData } from '../../utils/data';

@Component({
  selector: 'app-games',
  imports: [CartridgeComponent, LoaderComponent, DatePipe],
  templateUrl: './games.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './games.component.css',
})
export class GamesComponent {
  games: SteamGame[] = [];

  openGame(url: string) { window.open(url, '_blank'); }

  async ngOnInit() {
    try {
      this.games = await getData('steam-data');
    } catch (error) {
      console.error(error);
    }
  }
}

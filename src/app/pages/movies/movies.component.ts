import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from '../../components/molecules/rating/rating.component';
import { BluerayComponent } from '../../components/molecules/blueray/blueray.component';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { LetterboxdMovie } from '../../models/data-models';

@Component({
  selector: 'app-movies',
  imports: [RatingComponent, BluerayComponent, LoaderComponent],
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  openFilm(url: string) {
    window.open(url, '_blank');
  }

  films: LetterboxdMovie[] = [];

  async ngOnInit() {
    try {
      const res = await fetch('/.netlify/functions/letterboxd-data?limit=50'); // letterboxd rss caps at 50
      this.films = await res.json();
    } catch (error) {
      console.error(error);
    }
  }
}

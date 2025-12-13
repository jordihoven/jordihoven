import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RatingComponent } from 'src/app/components/molecules/rating/rating.component';
import { BluerayComponent } from 'src/app/components/molecules/blueray/blueray.component';
import { LetterboxdMovie } from 'src/app/models/data-models';

import { LoaderComponent } from 'src/app/components/molecules/loader/loader.component';

import { openLink } from 'src/app/utils/openLink';

@Component({
  selector: 'app-movies',
  imports: [LucideAngularModule, RatingComponent, BluerayComponent, LoaderComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  openFilm = openLink;

  loading = false;

  films: LetterboxdMovie[] = [];

  async ngOnInit() {
    try {
      this.loading = true;
      const res = await fetch('/.netlify/functions/letterboxd-data?limit=6'); // get 6 movies from letterboxd' rss...
      this.films = await res.json(); // set films to the response from the function...
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}

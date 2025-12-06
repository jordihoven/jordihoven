import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { RatingComponent } from 'src/app/components/molecules/rating/rating.component';
import { BluerayComponent } from 'src/app/components/molecules/blueray/blueray.component';

@Component({
  selector: 'app-movies',
  imports: [LucideAngularModule, RatingComponent, BluerayComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  films: any[] = []; // TODO: any is sussssssssss...

  async ngOnInit() {
    const res = await fetch('/.netlify/functions/letterboxd-data?limit=6'); // get 6 movies from letterboxd' rss...
    this.films = await res.json(); // set films to the response from the function...
  }
}

import { Component } from '@angular/core';
import { RatingComponent } from 'src/app/components/molecules/rating/rating.component';
import { GoodreadsBook } from 'src/app/models/data-models';

import { LoaderComponent } from 'src/app/components/molecules/loader/loader.component';

import { openLink } from 'src/app/utils/openLink';

@Component({
  selector: 'app-books',
  imports: [RatingComponent, LoaderComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: GoodreadsBook[] = [];

  loading = false;
  error = false;

  openBook = openLink;

  async ngOnInit() {
    try {
      this.loading = true;
      const res = await fetch('/.netlify/functions/goodreads-data?limit=6');
      this.books = await res.json();
    } catch (error) {
      this.error = true;
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}

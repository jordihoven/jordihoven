import { Component } from '@angular/core';
import { RatingComponent } from 'src/app/components/molecules/rating/rating.component';
import { LoaderComponent } from 'src/app/components/molecules/loader/loader.component';
import { GoodreadsBook } from 'src/app/models/data-models';

import { openLink } from 'src/app/utils/openLink';

@Component({
  selector: 'app-books',
  imports: [RatingComponent, LoaderComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: GoodreadsBook[] = [];

  openBook = openLink;

  async ngOnInit() {
    try {
      const res = await fetch('/.netlify/functions/goodreads-data');
      this.books = await res.json();
    } catch (error) {
      console.error(error);
    }
  }
}

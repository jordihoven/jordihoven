import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from '../../components/molecules/rating/rating.component';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { GoodreadsBook } from '../../models/data-models';

import { openLink } from '../../utils/openLink';

@Component({
  selector: 'app-books',
  imports: [RatingComponent, LoaderComponent],
  templateUrl: './books.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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

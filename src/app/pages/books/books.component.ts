import { Component } from '@angular/core';
import { RatingComponent } from 'src/app/components/molecules/rating/rating.component';

import { GoodreadsBook } from 'src/app/models/data-models';

@Component({
  selector: 'app-books',
  imports: [RatingComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: GoodreadsBook[] = [];

  loading = true;
  error = false;

  openLink(url: string) {
    window.open(url, '_blank');
  }

  async ngOnInit() {
    try {
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

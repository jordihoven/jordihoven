import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from '../../components/molecules/rating/rating.component';
import { BookComponent } from '../../components/molecules/book/book.component';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { BookhiveBook } from '../../models/data-models';
import { getData } from '../../utils/data';

@Component({
  selector: 'app-books',
  imports: [RatingComponent, LoaderComponent, BookComponent],
  templateUrl: './books.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: BookhiveBook[] = [];

  openBook(url: string) { window.open(url, '_blank'); }

  async ngOnInit() {
    try {
      this.books = await getData('bookhive-data');
    } catch (error) {
      console.error(error);
    }
  }
}

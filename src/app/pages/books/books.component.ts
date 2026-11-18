import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RatingComponent } from '../../components/molecules/rating/rating.component';
import { LucideImageOff } from '@lucide/angular';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { BookhiveBook } from '../../models/data-models';

@Component({
  selector: 'app-books',
  imports: [RatingComponent, LoaderComponent, LucideImageOff],
  templateUrl: './books.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './books.component.css',
})
export class BooksComponent {
  books: BookhiveBook[] = [];

  openBook(url: string) { window.open(url, '_blank'); }

  async ngOnInit() {
    try {
      const res = await fetch('/.netlify/functions/bookhive-data');
      this.books = await res.json();
    } catch (error) {
      console.error(error);
    }
  }
}

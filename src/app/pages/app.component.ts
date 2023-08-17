import { Component } from '@angular/core';
import { projects, books } from 'src/app/models/card-data';
import { Project, Book } from 'src/app/models/card-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  projects: Project[] = projects;
  books: Book[] = books;

  allCards: (Project | Book)[] = [...projects, ...books];
  customOrder: number[] = [1, 2, 3]; // Define the custom order of cards using the order property
  sortedCards: (Project | Book)[] = this.sortCardsByCustomOrder(this.customOrder, this.allCards);

  private sortCardsByCustomOrder(customOrder: number[], cards: (Project | Book)[]): (Project | Book)[] {
    return customOrder
      .map(order => cards.find(card => card.order === order))
      .filter(card => !!card) as (Project | Book)[];
  }

  isProject(card: Project | Book): card is Project {
    return 'description' in card;
  }

  isBook(card: Project | Book): card is Book {
    return 'author' in card;
  }

}

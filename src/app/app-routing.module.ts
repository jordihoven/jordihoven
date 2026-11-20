import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './pages/records/records.component';
import { HomeComponent } from './pages/home/home.component';
import { QuotesComponent } from './pages/quotes/quotes/quotes.component';

import { MoviesComponent } from './pages/movies/movies.component';
import { BooksComponent } from './pages/books/books.component';
import { NotesListComponent } from './pages/notes/notes-list/notes-list.component';
import { NoteComponent } from './pages/notes/note/note.component';
import { ThoughtsComponent } from './pages/thoughts/thoughts.component';
import { GamesComponent } from './pages/games/games.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notes', component: NotesListComponent },
  { path: 'note/:slug', component: NoteComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'books', component: BooksComponent },
  { path: 'games', component: GamesComponent },
  { path: 'thoughts', component: ThoughtsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

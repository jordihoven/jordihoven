import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './pages/records/records.component';
import { HomeComponent } from './pages/home/home.component';
import { QuotesComponent } from './pages/quotes/quotes/quotes.component';

import { MoviesComponent } from './pages/movies/movies.component';
import { BooksComponent } from './pages/books/books.component';
import { StravaComponent } from './pages/strava/strava.component';
import { NotesListComponent } from './pages/notes/notes-list/notes-list.component';
import { NoteComponent } from './pages/notes/note/note.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notes', component: NotesListComponent },
  { path: 'note/:slug', component: NoteComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'books', component: BooksComponent },
  { path: 'strava', component: StravaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

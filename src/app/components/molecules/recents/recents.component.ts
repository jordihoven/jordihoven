import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { DragScrollDirective } from '../../../utils/drag-scroll.directive';
import { BluerayComponent } from '../blueray/blueray.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { GoodreadsBook, LetterboxdMovie, NoteFile } from '../../../models/data-models';
import { formatDate } from '../../../utils/date';
import { noteSlug, noteTitle } from '../../../utils/note';

const RECENTS_COUNT = 6;

interface RecentItem {
  type: 'book' | 'movie' | 'note';
  title: string;
  date: string;
  link: string;
  external: boolean;
  image?: string;
  note?: NoteFile;
}

async function fetchJson<T>(url: string): Promise<T[]> {
  const res = await fetch(url);
  return res.ok ? res.json() : [];
}

@Component({
  selector: 'app-recents',
  imports: [RouterLink, NgTemplateOutlet, DragScrollDirective, BluerayComponent, NoteCardComponent],
  templateUrl: './recents.component.html',
  styleUrl: './recents.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RecentsComponent implements OnInit {
  items: RecentItem[] = [];
  formatDate = formatDate;

  async ngOnInit() {
    // allSettled: one broken feed shouldn't hide the others
    const [books, movies, notes] = await Promise.allSettled([
      fetchJson<GoodreadsBook>('/.netlify/functions/goodreads-data'),
      fetchJson<LetterboxdMovie>(`/.netlify/functions/letterboxd-data?limit=${RECENTS_COUNT}`),
      fetchJson<NoteFile>('/.netlify/functions/notes-data'),
    ]);
    const ok = <T>(r: PromiseSettledResult<T[]>) => (r.status === 'fulfilled' ? r.value : []);

    this.items = [
      ...ok(books).map((b): RecentItem => ({
        type: 'book',
        title: b.title,
        date: b.readAt || b.dateAdded,
        link: b.link,
        external: true,
        image: b.cover,
      })),
      ...ok(movies).map((m): RecentItem => ({
        type: 'movie',
        title: m.title,
        date: m.date,
        link: m.url,
        external: true,
        image: m.poster,
      })),
      ...ok(notes).map((n): RecentItem => ({
        type: 'note',
        title: noteTitle(n.name),
        date: n.updatedAt,
        link: `/note/${noteSlug(n.name)}`,
        external: false,
        note: n,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, RECENTS_COUNT);
  }
}

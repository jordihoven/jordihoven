import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { noteSlug } from '../../../utils/note';
import { NoteFile } from '../../../models/data-models';
import { LoaderComponent } from '../../../components/molecules/loader/loader.component';
import { NoteCardComponent } from '../../../components/molecules/note-card/note-card.component';
import { getData } from '../../../utils/data';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [LoaderComponent, NoteCardComponent],
  templateUrl: './notes-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent implements OnInit {
  private router = inject(Router);

  notes: NoteFile[] = [];
  noteNames: string[] = [];
  loading = true;

  async ngOnInit() {
    try {
      this.notes = await getData('notes-data');
      this.noteNames = this.notes.map((n) => n.name.replace('.md', ''));
    } catch (err) {
      console.error('Could not load notes', err);
    } finally {
      this.loading = false;
    }
  }

  openNote(note: NoteFile) {
    this.router.navigate(['/note', noteSlug(note.name)]);
  }
}

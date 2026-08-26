import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { formatDate } from '../../../utils/date';
import { LoaderComponent } from '../../../components/molecules/loader/loader.component';

interface NoteFile {
  name: string;
  path: string;
  sha: string;
  updatedAt: string;
  preview: string;
}

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './notes-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent implements OnInit {
  private router = inject(Router);

  notes: NoteFile[] = [];
  loading = true;
  formatDate = formatDate;

  async ngOnInit() {
    try {
      const res = await fetch('/.netlify/functions/notes-data');
      this.notes = await res.json();
    } catch (err) {
      console.error('Could not load notes', err);
    } finally {
      this.loading = false;
    }
  }

  openNote(note: NoteFile) {
    const slug = note.name.replace('.md', '').replace(/ /g, '-');
    this.router.navigate(['/note', slug]);
  }

  prettify(filename: string): string {
    return filename
      .replace('.md', '')
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

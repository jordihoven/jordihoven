import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { formatDate } from 'src/app/utils/date';
import { LoaderComponent } from 'src/app/components/molecules/loader/loader.component';

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
  imports: [CommonModule, LoaderComponent],
  templateUrl: './notes-list.component.html',
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

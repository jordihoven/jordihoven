import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesService, NoteFile } from '../../../services/notes.service';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent implements OnInit {
  private notesService = inject(NotesService);
  private router = inject(Router);

  notes: NoteFile[] = [];

  ngOnInit() {
    this.notesService.getNotesList().subscribe({
      next: (notes) => this.notes = notes,
      error: (err) => console.error('Could not load notes', err),
    });
  }

  openNote(note: NoteFile) {
    const slug = note.name.replace('.md', '');
    this.router.navigate(['/note', slug]);
  }

  prettify(filename: string): string {
    return filename
      .replace('.md', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

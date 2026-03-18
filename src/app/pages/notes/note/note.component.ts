import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { NotesService } from '../../../services/notes.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private notesService = inject(NotesService);
  private sanitizer = inject(DomSanitizer);

  content: SafeHtml = '';

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    const path = `${slug}.md`;

    this.notesService.getNoteContent(path).subscribe({
      next: (md) => {
        const html = marked.parse(md) as string;
        this.content = this.sanitizer.bypassSecurityTrustHtml(html);
      },
      error: (err) => {
        console.error(err);
        this.content = this.sanitizer.bypassSecurityTrustHtml('<p>Could not load this note.</p>');
      },
    });
  }
}

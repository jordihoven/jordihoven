import { Component, inject, OnInit, ChangeDetectionStrategy, ElementRef, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { renderNote } from '../../../utils/note';
import { NoteFile } from '../../../models/data-models';
import { getData } from '../../../utils/data';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './note.component.css',
})
export class NoteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  content: SafeHtml = '';
  lightboxImage: HTMLImageElement | null = null;
  private lightbox = viewChild.required<ElementRef<HTMLDialogElement>>('lightbox');

  onContentClick(event: MouseEvent) {
    const target = event.target as Element;

    if (target instanceof HTMLImageElement) {
      this.lightboxImage = target;
      this.lightbox().nativeElement.showModal();
      return;
    }

    const btn = target.closest('.copy-btn');
    if (!btn) return;

    const code = btn.closest('.code-block')?.querySelector('pre code');
    if (!code) return;

    navigator.clipboard.writeText(code.textContent ?? '');
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1500);
  }

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    try {
      const searchTerm = slug.replace(/-/g, ' ').toLowerCase();

      const notes = await getData<NoteFile[]>('notes-data');

      const note = notes.find((n) =>
        n.name.toLowerCase().replace('.md', '') === searchTerm
      );

      if (!note) {
        this.content = this.sanitizer.bypassSecurityTrustHtml('<p>Note not found.</p>');
        return;
      }

      const title = note.name.replace('.md', '');
      const availableNoteNames = notes.map((n) => n.name.replace('.md', ''));
      const html = renderNote(`# ${title}\n\n${note.content}`, availableNoteNames);
      this.content = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (err) {
      console.error(err);
      this.content = this.sanitizer.bypassSecurityTrustHtml('<p>Could not load this note.</p>');
    }
  }
}

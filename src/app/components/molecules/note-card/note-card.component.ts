import { Component, Input, ChangeDetectionStrategy, inject, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NoteFile } from '../../../models/data-models';
import { formatDate } from '../../../utils/date';
import { noteTitle, renderNote } from '../../../utils/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  host: { '[class.loaded]': 'loaded' },
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  private sanitizer = inject(DomSanitizer);
  private el = inject(ElementRef<HTMLElement>);

  @Input({ required: true }) note!: NoteFile;
  @Input() noteNames: string[] = [];
  formatDate = formatDate;
  noteTitle = noteTitle;
  html: SafeHtml = '';
  loaded = false;

  ngOnInit() {
    this.html = this.sanitizer.bypassSecurityTrustHtml(renderNote(this.note.content, this.noteNames));
  }

  // fade in once preview images are decoded (or failed), so nothing pops in
  async ngAfterViewInit() {
    const images: HTMLImageElement[] = Array.from(this.el.nativeElement.querySelectorAll('img'));
    await Promise.allSettled(images.map((img) => img.decode()));
    this.loaded = true;
  }
}

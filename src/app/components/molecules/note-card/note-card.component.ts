import { Component, Input, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NoteFile } from '../../../models/data-models';
import { formatDate } from '../../../utils/date';
import { noteTitle, renderNote } from '../../../utils/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NoteCardComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);

  @Input({ required: true }) note!: NoteFile;
  @Input() noteNames: string[] = [];
  formatDate = formatDate;
  noteTitle = noteTitle;
  html: SafeHtml = '';

  ngOnInit() {
    this.html = this.sanitizer.bypassSecurityTrustHtml(renderNote(this.note.content, this.noteNames));
  }
}

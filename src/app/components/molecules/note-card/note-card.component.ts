import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NoteFile } from '../../../models/data-models';
import { formatDate } from '../../../utils/date';
import { noteTitle } from '../../../utils/note';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class NoteCardComponent {
  @Input({ required: true }) note!: NoteFile;
  formatDate = formatDate;
  noteTitle = noteTitle;
}

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  content: SafeHtml = '';

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;

    const filename = slug.replace(/-/g, ' ');
    const title = slug.replace(/-/g, ' ');

    try {
      const res = await fetch(`/.netlify/functions/notes-data?path=${encodeURIComponent(filename)}`);
      const data = await res.json();
      const html = marked.parse(`# ${title}\n\n${data.content}`) as string;
      this.content = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (err) {
      console.error(err);
      this.content = this.sanitizer.bypassSecurityTrustHtml('<p>Could not load this note.</p>');
    }
  }
}

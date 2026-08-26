import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { marked, Renderer } from 'marked';

const renderer = new Renderer();
renderer.link = (href: string, title: string | null, text: string) => {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`;
};
marked.setOptions({ renderer });

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
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

    try {
      const searchTerm = slug.replace(/-/g, ' ').toLowerCase();

      const listRes = await fetch('/.netlify/functions/notes-data');
      const notes = await listRes.json();

      const note = notes.find((n: any) =>
        n.name.toLowerCase().replace('.md', '') === searchTerm
      );

      if (!note) {
        this.content = this.sanitizer.bypassSecurityTrustHtml('<p>Note not found.</p>');
        return;
      }

      const filename = note.name.replace('.md', '');
      const title = filename;

      const res = await fetch(`/.netlify/functions/notes-data?path=${encodeURIComponent(filename)}`);
      const data = await res.json();
      let content = data.content;

      content = content.replace(/!\[\[([^\]]+)\]\]/g, (_: string, filename: string) => {
        const trimmed = filename.trim();
        const imagePath = trimmed.startsWith('images/') ? trimmed.slice(7) : trimmed;
        const url = `/.netlify/functions/notes-data?image=${encodeURIComponent(imagePath)}`;
        return `<img src="${url}" alt="">`;
      });

      const availableNoteNames = notes.map((n: any) => n.name.replace('.md', ''));

      content = content.replace(/\[\[([^\]]+)\]\]/g, (_: string, linkTitle: string) => {
        const linkSlug = linkTitle.toLowerCase().replace(/\s+/g, '-');
        const isValid = availableNoteNames.some((n: string) => n.toLowerCase() === linkTitle.toLowerCase());
        const cssClass = isValid ? 'internal-link' : 'broken-link';
        return `[${linkTitle}](/note/${linkSlug} "${cssClass}")`;
      });

      const html = marked.parse(`# ${title}\n\n${content}`) as string;
      this.content = this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (err) {
      console.error(err);
      this.content = this.sanitizer.bypassSecurityTrustHtml('<p>Could not load this note.</p>');
    }
  }
}

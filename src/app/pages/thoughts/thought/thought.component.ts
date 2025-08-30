import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-thought',
  standalone: false, 
  template: `
    <main style="padding:2rem">
      <article [innerHTML]="content"></article>
    </main>
  `,
})
export class ThoughtComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  content: SafeHtml = '';

ngOnInit() {
  const slug = this.route.snapshot.paramMap.get('slug');
  if (!slug) return;

  const path = `/assets/thoughts/${slug}.md`;

  this.http.get(path, { responseType: 'text' }).subscribe({
    next: (md) => {
      const html = marked.parse(md) as string;
      this.content = this.sanitizer.bypassSecurityTrustHtml(html);
    },
    error: (err) => {
      console.error(err);
      this.content = this.sanitizer.bypassSecurityTrustHtml(
        '<p>Could not load this thought.</p>'
      );
    }
  });
}
}
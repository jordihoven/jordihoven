import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thoughts',
  standalone: false,
  templateUrl: './thoughts.component.html',
  styleUrl: './thoughts.component.css',
})
export class ThoughtsComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  thoughts: string[] = [];

    ngOnInit() {
    this.http.get<string[]>('/assets/thoughts/index.json').subscribe({
      next: data => this.thoughts = data,
      error: err => console.error('Could not load thoughts list', err)
    });
  }

  openThought(slug: string) {
    this.router.navigate(['/thought', slug]);
  }

  prettify(slug: string) {
    return slug .split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

}

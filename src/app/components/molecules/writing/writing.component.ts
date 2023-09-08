import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-writing',
  templateUrl: './writing.component.html',
  styleUrls: ['./writing.component.css'],
})
export class WritingComponent {
  articles = [
    { title: 'Article 1', filename: 'article' },
    { title: 'Article 2', filename: 'someother' },
    { title: 'Article 3', filename: 'thought' }, // Add your third article here
  ];
  constructor(private router: Router) {} // Inject the Router service

  goToArticle(article: any) {
    this.router.navigate([{ outlets: { 'article-outlet': ['article', article.filename] } }]);
  }
}

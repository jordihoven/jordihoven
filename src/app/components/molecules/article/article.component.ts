import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  articleContent: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const filename = this.route.snapshot.paramMap.get('filename');
    if (filename) {
      // Load the Markdown file by appending the ".md" extension
      this.http.get(`/assets/blog/${filename}.md`, { responseType: 'text' }).subscribe((mdContent) => {
        this.articleContent = mdContent;
      });
    }
  }
}

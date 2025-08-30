import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';

@Component({
    selector: 'Quotes',
    templateUrl: './quotes.component.html',
    styleUrl: './quotes.component.css',
    standalone: false
})
export class QuotesComponent implements OnInit {

  quotesContent: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/quotes.md', { responseType: 'text' }).subscribe(data => {
      this.quotesContent = marked(data) as string;  // Explicitly cast to string
    });
  }

}

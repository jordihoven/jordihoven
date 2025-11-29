import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  films: any[] = []; // TODO: any is sussssssssss...

  async ngOnInit() {
    const res = await fetch('/.netlify/functions/letterboxd-data'); // call serverless netlify function...
    this.films = await res.json(); // set films to the response from the function...
  }
}

import { Component } from '@angular/core';
import { projects } from 'src/app/models/card-data';
import { Project } from 'src/app/models/card-interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent {
  projects: Project[] = projects; // No need for allCards and complex sorting logic
}

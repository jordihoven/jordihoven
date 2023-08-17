import { Component } from '@angular/core';
import { projects } from 'src/app/models/card-data';
import { Project } from 'src/app/models/card-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  projects: Project[] = projects;
}

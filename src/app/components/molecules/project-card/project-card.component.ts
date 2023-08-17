import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/card-interface';

@Component({
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectComponent {
  @Input() project!: Project;
}

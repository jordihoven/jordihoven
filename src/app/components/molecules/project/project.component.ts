import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/card-interface';

@Component({
  selector: 'Project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() project!: Project;
}

import { Component, Input } from '@angular/core';
import { ProjectData } from 'src/app/models/project-data';

@Component({
  selector: 'Project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() project!: ProjectData;
}

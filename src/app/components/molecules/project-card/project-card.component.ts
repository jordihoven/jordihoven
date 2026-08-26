import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../../models/card-interface';

@Component({
    selector: 'project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProjectComponent {
  @Input() project!: Project;
}

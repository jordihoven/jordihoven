import { Component, ChangeDetectionStrategy } from '@angular/core';
import { projects } from '../../models/card-data';
import { Project } from '../../models/card-interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent {
  projects: Project[] = projects; // No need for allCards and complex sorting logic
}

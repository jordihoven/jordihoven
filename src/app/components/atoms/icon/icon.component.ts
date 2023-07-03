import { Component, Input } from '@angular/core';

@Component({
  selector: 'Icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})

export class IconComponent {
  @Input('feather-icon')
  featherIcon: string = 'home';
}
import { Component, computed, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-rating',
  imports: [LucideAngularModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
  standalone: true,
})
export class RatingComponent {
  // rating prop...
  @Input() rating: string | number = 0;

  totalStars = Array.from({ length: 5 });

  // Array of full stars (for iteration)
  fullStars = computed(() => Array.from({ length: Math.floor(Number(this.rating)) }));

  // Boolean flag for half star
  hasHalfStar = computed(() => Number(this.rating) % 1 === 0.5);
}

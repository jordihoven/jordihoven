import { Component } from '@angular/core';
import { LoaderComponent } from 'src/app/components/molecules/loader/loader.component';
import { openLink } from 'src/app/utils/openLink';

interface StravaActivity {
  id: number;
  name: string;
  sport_type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  start_date: string;
  start_date_local: string;
  average_speed: number;
  max_speed: number;
  average_heartrate: number;
  kilojoules: number;
  calories: number;
  photos: {
    url: string;
    source: number;
  } | null;
  map: {
    polyline: string;
  } | null;
}

@Component({
  selector: 'app-strava',
  imports: [LoaderComponent],
  templateUrl: './strava.component.html',
  styleUrl: './strava.component.css',
})
export class StravaComponent {
  openLink = openLink;
  activities: StravaActivity[] = [];
  loading = true;

  async ngOnInit() {
    try {
      const res = await fetch('/.netlify/functions/strava-data?limit=10');
      this.activities = await res.json();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  formatDuration(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  }

  formatDistance(meters: number): string {
    const km = meters / 1000;
    return `${km.toFixed(1)} km`;
  }

  formatElevation(meters: number): string {
    return `${Math.round(meters)} m`;
  }

  // TODO: replace this with VueUse TimeSince...
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }

  getStravaUrl(id: number): string {
    return `https://www.strava.com/activities/${id}`;
  }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { formatDate } from '../../utils/date';

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
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './strava.component.css',
})
export class StravaComponent {
  openLink(url: string) { window.open(url, '_blank'); }
  formatDate = formatDate;
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

  getStravaUrl(id: number): string {
    return `https://www.strava.com/activities/${id}`;
  }
}

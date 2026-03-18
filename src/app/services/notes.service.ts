import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface NoteFile {
  name: string;
  path: string;
  sha: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly OWNER = 'jordihoven';
  private readonly REPO = 'notes';
  private readonly BASE_URL = `https://api.github.com/repos/${this.OWNER}/${this.REPO}/contents`;

  constructor(private http: HttpClient) {}

  getNotesList(): Observable<NoteFile[]> {
    return this.http.get<NoteFile[]>(this.BASE_URL).pipe(
      map(files => files.filter(f => f.name.endsWith('.md')))
    );
  }

  getNoteContent(path: string): Observable<string> {
    const rawUrl = `https://raw.githubusercontent.com/${this.OWNER}/${this.REPO}/main/${path}`;
    return this.http.get(rawUrl, { responseType: 'text' });
  }
}

export interface BookhiveBook {
  title: string;
  author: string;
  dateAdded: string;
  readAt: string; // empty when no finishedAt set in bookhive
  rating: number | 0; // TODO: check whether this is type safe?
  cover: string;
  url: string;
  link: string;
  review: string;
}

export interface LetterboxdMovie {
  url: string;
  title: string;
  year: string;
  rating: number;
  date: string;
  rewatch: boolean;
  poster: string;
  diaryReview: string;
}

export interface NoteFile {
  name: string;
  path: string;
  sha: string;
  updatedAt: string;
  preview: string;
  content: string;
}

export interface SteamGame {
  appid: number;
  name: string;
  hours: number;
  lastPlayed: string;
  cover: string;
  coverFallback: string;
  url: string;
}

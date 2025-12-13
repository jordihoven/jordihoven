export interface GoodreadsBook {
  title: string;
  author: string;
  dateAdded: string;
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

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

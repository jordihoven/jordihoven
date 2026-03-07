# Project: jordihoven - Personal Portfolio Website

## Overview
Personal portfolio site showcasing projects, books, movies, records, quotes, and thoughts. Built with Angular.

## Tech Stack
- **Framework**: Angular 20 (standalone components)
- **Hosting**: Netlify
- **Data Sources**:
  - Goodreads RSS (books)
  - Letterboxd RSS (movies)
  - Local JSON/data files (records, projects, quotes, thoughts)

## Pages/Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomeComponent | Intro + projects |
| `/movies` | MoviesComponent | Watched movies from Letterboxd |
| `/books` | BooksComponent | Read books from Goodreads |
| `/records` | RecordsComponent | Vinyl record collection |
| `/quotes` | QuotesComponent | Favorite quotes |
| `/thoughts` | ThoughtsComponent | Blog posts |
| `/thought/:slug` | ThoughtComponent | Individual blog post |

## Key Files
- `src/app/app-routing.module.ts` - Routes configuration
- `src/app/pages/app.component.html` - Main layout with nav dock
- `netlify/functions/goodreads-data.js` - Goodreads RSS fetcher
- `netlify/functions/letterboxd-data.js` - Letterboxd RSS fetcher
- `src/app/models/card-data.ts` - Static project data

## Build Commands
```bash
npm start      # dev server
npm run build  # production build
```

## TODO (from README)
- [x] show active route
- [x] make dock component like julien thibeaut
- [ ] maybe cut records component into smaller components?
- [ ] fix scrollbar (seems to not have any border radius?)
- [ ] use api for coverarts (musicbrainz)

## External Dependencies
- Goodreads user: 148826963
- Letterboxd username: stoicbean

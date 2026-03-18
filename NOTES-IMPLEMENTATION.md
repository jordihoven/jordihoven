# Notes Feature Implementation

## Completed
- Netlify function (notes-data.js) handles all GitHub API calls with GITHUB_TOKEN
- List view at /notes
- Single note view at /note/:slug
- Clean URLs (spaces → dashes)
- Title shown as first heading in note view
- Sort by updated_at (most recent first)
- Date displayed in list view
- Preview text (~200 chars) shown in list view
- Loader while fetching
- Only notes in `/shared` folder are displayed (folder-based privacy)

## How to Share a Note

Move any Obsidian note to the `/shared` folder in your vault to display it on your website:

```
your-vault/
├── /shared/           ← Notes here are public
│   ├── my-note.md     ← Shown on website
│   └── another.md     ← Shown on website
├── private-note.md    ← NOT shown (outside /shared)
└── secret.md          ← NOT shown (outside /shared)
```

**Privacy:**
- Any note outside `/shared` is never exposed
- Even if someone guesses a URL to a private note, they get a 404
- Only notes in `/shared` appear on the website

## Future Improvements

### High Priority
- None

### Medium Priority
- Add custom title support (use title instead of filename)
- Pagination (if many notes accumulate)

### Low Priority
- Cache responses in localStorage or Netlify edge

## Technical Notes

### Architecture
- **Netlify Function**: Handles all GitHub API calls, authenticates with GITHUB_TOKEN
- **Angular Components**: Fetch from Netlify function, render markdown with `marked`
- Token is server-side only, hidden from client

### Privacy
- Only notes in the `/shared` folder are returned by the function
- Both list and detail endpoints only fetch from `/shared`
- Direct URLs to private notes return 404

### API Endpoints
- Function: `/.netlify/functions/notes-data` (lists all notes in /shared)
- Function: `/.netlify/functions/notes-data?path=<filename>` (gets single note content)
- GitHub (internal to function): Uses GITHUB_TOKEN for authentication

### File Structure
```
netlify/functions/
└── notes-data.js          # Fetches from GitHub /shared folder

src/app/
└── pages/
    └── notes/
        ├── notes-list/
        │   ├── notes-list.component.ts
        │   ├── notes-list.component.html
        │   └── notes-list.component.css
        └── note/
            ├── note.component.ts
            ├── note.component.html
            └── note.component.css
```

### Environment Variables (Netlify)
- `GITHUB_TOKEN`: Fine-grained Personal Access Token with read access to notes repo

### Vault Structure (Obsidian)
```
your-vault/
├── /shared/           ← Public notes (synced to GitHub)
│   ├── note-1.md
│   └── note-2.md
├── /other-folders/    ← Private notes (not synced)
│   └── private.md
└── /more-private/     ← Private notes (not synced)
    └── secret.md
```

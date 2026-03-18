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
- Only notes with `#share` tag are displayed (privacy filter)

## How to Share a Note

Add `#share` anywhere in any Obsidian note you want displayed on your website:

```markdown
# My Note

Some content here...

#share
```

That's it! The tag can be anywhere in the note - at the end, in the middle, doesn't matter. It's case-insensitive.

**Privacy:**
- Notes without `#share` are never exposed
- Even if someone guesses a URL to a private note, they get a 404
- Only shared notes appear on the website

## Future Improvements

### High Priority
- **Fix GitHub Search API integration** - Currently using Contents API which requires fetching all files. Search API would be more efficient but has permission/query issues that need debugging.

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
- Only notes containing `#share` (case-insensitive) are returned by the function
- Both list and detail endpoints filter by this tag
- Direct URLs to private notes return 404

### API Strategy (Current)
- Uses GitHub Contents API to list all files in repo
- Fetches content for each file to check for `#share`
- Works well with small number of files in repo
- Not ideal for repos with 500+ files

### API Strategy (Desired)
- Use GitHub Search API: `#share repo:jordihoven/notes language:markdown`
- Would reduce API calls from N+1 to ~7
- Needs debugging: query syntax or PAT permissions issue

### API Endpoints
- Function: `/.netlify/functions/notes-data` (list shareable notes)
- Function: `/.netlify/functions/notes-data?path=<filename>` (get single note content, must have `#share`)
- GitHub (internal to function): Uses GITHUB_TOKEN for authentication

### File Structure
```
netlify/functions/
└── notes-data.js          # Fetches from GitHub, filters by #share tag

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

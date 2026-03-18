const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'jordihoven';
const REPO = 'notes';
const BASE_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;
const COMMITS_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits`;

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

async function getFiles() {
  const res = await fetch(BASE_URL, { headers });
  if (!res.ok) throw new Error(`Failed to fetch files: ${res.status}`);
  return res.json();
}

async function getLastCommit(path) {
  const url = `${COMMITS_URL}?path=${path}&per_page=1`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch commit: ${res.status}`);
  const commits = await res.json();
  return commits.length > 0 ? commits[0].commit.author.date : new Date().toISOString();
}

async function getContent(path) {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/${path}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Failed to fetch content: ${res.status}`);
  return res.text();
}

function isShareable(content) {
  return content.toLowerCase().includes('#share');
}

function extractContent(content) {
  const frontmatterMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (frontmatterMatch) {
    return content.slice(frontmatterMatch[0].length);
  }
  return content;
}

function truncatePreview(content, maxChars = 200) {
  const cleaned = content
    .replace(/[#*`_\[\]]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  if (cleaned.length <= maxChars) return cleaned;
  return cleaned.slice(0, maxChars).trim() + '...';
}

exports.handler = async (event) => {
  try {
    const { path } = event.queryStringParameters || {};

    const files = await getFiles();
    const mdFiles = files.filter(f => f.name.endsWith('.md'));

    if (path) {
      const file = mdFiles.find(f => f.name === `${path}.md`);
      if (!file) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Note not found' }) };
      }
      const content = await getContent(file.name);

      if (!isShareable(content)) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Note not found' }) };
      }

      const cleanContent = extractContent(content);
      return { statusCode: 200, body: JSON.stringify({ content: cleanContent }) };
    }

    const notes = await Promise.all(
      mdFiles.map(async (file) => {
        const [updatedAt, content] = await Promise.all([
          getLastCommit(file.name),
          getContent(file.name),
        ]);

        if (!isShareable(content)) {
          return null;
        }

        return {
          name: file.name,
          path: file.path,
          sha: file.sha,
          updatedAt,
          preview: truncatePreview(content),
        };
      })
    );

    const shareableNotes = notes.filter(n => n !== null);
    shareableNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return {
      statusCode: 200,
      body: JSON.stringify(shareableNotes),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch notes' }),
    };
  }
};

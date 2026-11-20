import { marked, Renderer } from 'marked';
import hljs from 'highlight.js/lib/common';

export function noteSlug(filename: string): string {
  return filename.replace('.md', '').replace(/ /g, '-');
}

export function noteTitle(filename: string): string {
  return filename
    .replace('.md', '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const renderer = new Renderer();
renderer.link = (href: string, title: string | null, text: string) => {
  const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
  const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  const titleAttr = title ? ` title="${title}"` : '';
  return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`;
};
const COPY_ICON = `<svg class="lucide-icon copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const CHECK_ICON = `<svg class="lucide-icon check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

renderer.code = (code: string, infostring: string | undefined) => {
  const lang = (infostring || '').match(/\S*/)?.[0] ?? '';
  const result =
    lang && hljs.getLanguage(lang)
      ? hljs.highlight(code, { language: lang })
      : hljs.highlightAuto(code);
  const language = result.language ?? 'plaintext';
  return `<div class="code-block"><button class="copy-btn" type="button" aria-label="Copy code">${COPY_ICON}${CHECK_ICON}</button><pre><code class="hljs language-${language}">${result.value}</code></pre></div>`;
};
marked.setOptions({ renderer });

/** Turns Obsidian markdown (image embeds, [[wikilinks]]) into HTML. */
export function renderNote(content: string, availableNoteNames: string[]): string {
  content = content.replace(/!\[\[([^\]]+)\]\]/g, (_: string, filename: string) => {
    const trimmed = filename.trim();
    const imagePath = trimmed.startsWith('images/') ? trimmed.slice(7) : trimmed;
    const url = `/.netlify/functions/notes-data?image=${encodeURIComponent(imagePath)}`;
    return `<div class="img-box"><img src="${url}" alt=""></div>`;
  });

  content = content.replace(/\[\[([^\]]+)\]\]/g, (_: string, linkTitle: string) => {
    const linkSlug = linkTitle.toLowerCase().replace(/\s+/g, '-');
    const isValid = availableNoteNames.some((n: string) => n.toLowerCase() === linkTitle.toLowerCase());
    const cssClass = isValid ? 'internal-link' : 'broken-link';
    return `[${linkTitle}](/note/${linkSlug} "${cssClass}")`;
  });

  return marked.parse(content) as string;
}

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

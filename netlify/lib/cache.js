// shared by all data functions: browser revalidates after 1 min,
// Netlify CDN serves stale for a day while refetching
exports.CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=60',
  'Netlify-CDN-Cache-Control': 'public, max-age=60, stale-while-revalidate=86400',
};

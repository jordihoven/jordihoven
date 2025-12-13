// goodreads rss data...

const { XMLParser } = require("fast-xml-parser");

// https://www.goodreads.com/review/list_rss/148826963?shelf=read
const GOODREADS_USERID = "148826963";
const GOODREADS_URL = "https://www.goodreads.com";
const GOODREADS_SHELF = "read";
const GOODREADS_RSS = `${GOODREADS_URL}/review/list_rss/${GOODREADS_USERID}?shelf=${GOODREADS_SHELF}`;

exports.handler = async (event, context) => {
  try {
    // Fetch RSS feed server-side
    const xml = await fetch(GOODREADS_RSS).then((res) => res.text());

    // Parse XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      processEntities: true,
    });
    const { rss } = parser.parse(xml);

    // get rid of html tags...
    const stripHtml = (html) => html?.replace(/<[^>]*>/g, "");

    const books = rss.channel.item.map((entry) => ({
      title: entry.title,
      author: entry.author_name,
      rating: entry.user_rating ? Number(entry.user_rating) : null,
      cover: entry.book_large_image_url || entry.book_medium_image_url,
      url: entry.link,
      review: stripHtml(entry.user_review),
      link: entry.link,
      dateAdded: entry.user_date_added,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(books),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Goodreads feed" }),
    };
  }
};

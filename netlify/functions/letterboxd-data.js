const { XMLParser } = require("fast-xml-parser");

const LETTERBOXD_USERNAME = "stoicbean";
const LETTERBOXD_URL = "https://letterboxd.com";
const LETTERBOXD_FEED = `${LETTERBOXD_URL}/${LETTERBOXD_USERNAME}/rss/`;
const LETTERBOXD_FILM_URL = (slug) => `${LETTERBOXD_URL}/film/${slug}/`;

exports.handler = async (event, context) => {
  try {
    const limit = parseInt(event.queryStringParameter?.limit) || 4;
    // Fetch RSS feed server-side
    const xml = await fetch(LETTERBOXD_FEED).then((res) => res.text());

    // Parse XML
    const parser = new XMLParser();
    const { rss } = parser.parse(xml);

    // Extract latest films
    const films = rss.channel.item
      .filter((item) => item["letterboxd:watchedDate"])
      .sort((a, b) => b["letterboxd:watchedDate"].localeCompare(a["letterboxd:watchedDate"]))
      .slice(0, limit)
      .map((entry) => {
        const [poster] = entry.description.match(/(http(s?):)([\s\w./|-])*\.jpg/) ?? [];
        const [, slug] = entry.link.match(/film\/([^/]*)\/?/) ?? [];

        return {
          title: entry["letterboxd:filmTitle"],
          year: entry["letterboxd:filmYear"],
          rating: entry["letterboxd:memberRating"],
          date: entry["letterboxd:watchedDate"],
          rewatch: entry["letterboxd:rewatch"] === "Yes",
          poster,
          url: LETTERBOXD_FILM_URL(slug),
        };
      });

    return {
      statusCode: 200,
      body: JSON.stringify(films),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Letterboxd feed" }),
    };
  }
};

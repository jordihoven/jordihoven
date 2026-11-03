// books from bookhive (atproto), goodreads killed their rss feeds in oct 2026

const DID = "did:plc:o67xeqqjchzzecfvkyq2wlfs"; // jordihoven.nl
const PDS = "https://pholiota.us-west.host.bsky.network"; // ponytail: hardcoded, resolve via plc.directory if the PDS ever moves
const RECORDS_URL = `${PDS}/xrpc/com.atproto.repo.listRecords?repo=${DID}&collection=buzz.bookhive.book&limit=100`;

const coverUrl = (cover) =>
  cover ? `${PDS}/xrpc/com.atproto.sync.getBlob?did=${DID}&cid=${cover.ref.$link}` : "";

exports.handler = async () => {
  try {
    // ponytail: single page (max 100), follow `cursor` once the shelf grows past that
    const { records } = await fetch(RECORDS_URL).then((res) => res.json());

    const books = records
      .map((r) => r.value)
      .filter((b) => b.status === "buzz.bookhive.defs#finished")
      .map((b) => ({
        title: b.title,
        author: b.authors,
        rating: b.stars ? b.stars / 2 : null, // bookhive stores 1-10
        cover: coverUrl(b.cover),
        url: `https://bookhive.buzz/books/${b.hiveId}`,
        link: `https://bookhive.buzz/books/${b.hiveId}`,
        review: b.review ?? "",
        dateAdded: b.createdAt,
        readAt: b.finishedAt ?? "",
      }))
      .sort((a, b) => (b.readAt || b.dateAdded).localeCompare(a.readAt || a.dateAdded));

    return {
      statusCode: 200,
      body: JSON.stringify(books),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch BookHive records" }),
    };
  }
};

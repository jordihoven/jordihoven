// steam owned games, sorted by last played

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = "76561198746733639";
const STEAM_OWNED_GAMES = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1`;
const STEAM_CDN = (appid, file) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/${file}`;

// store api knows the real (hashed) asset paths, which newer games need
const STORE_ITEMS = (appids) =>
  `https://api.steampowered.com/IStoreBrowseService/GetItems/v1/?input_json=${encodeURIComponent(
    JSON.stringify({
      ids: appids.map((appid) => ({ appid })),
      context: { country_code: "NL" },
      data_request: { include_assets: true },
    })
  )}`;

const fetchAssets = async (appids) => {
  try {
    const { response } = await fetch(STORE_ITEMS(appids)).then((res) => res.json());
    return Object.fromEntries((response.store_items ?? []).map((item) => [item.appid, item.assets]));
  } catch (err) {
    console.error(err);
    return {};
  }
};

const assetUrl = (assets, file) =>
  assets?.[file] &&
  `https://shared.akamai.steamstatic.com/store_item_assets/${assets.asset_url_format.replace("${FILENAME}", assets[file])}`;

exports.handler = async (event) => {
  try {
    const limit = parseInt(event.queryStringParameters?.limit) || 30;
    const { response } = await fetch(STEAM_OWNED_GAMES).then((res) => res.json());

    const owned = (response.games ?? [])
      .filter((game) => game.playtime_forever > 0)
      .sort((a, b) => b.rtime_last_played - a.rtime_last_played)
      .slice(0, limit);

    const assets = await fetchAssets(owned.map((game) => game.appid));

    const games = owned.map((game) => ({
      appid: game.appid,
      name: game.name,
      hours: Math.round(game.playtime_forever / 60),
      lastPlayed: new Date(game.rtime_last_played * 1000).toISOString(),
      cover: assetUrl(assets[game.appid], "library_capsule") ?? STEAM_CDN(game.appid, "library_600x900.jpg"),
      coverFallback: assetUrl(assets[game.appid], "header") ?? STEAM_CDN(game.appid, "header.jpg"),
      url: `https://store.steampowered.com/app/${game.appid}`,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(games),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Steam games" }),
    };
  }
};

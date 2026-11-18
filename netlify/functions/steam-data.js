// steam owned games, sorted by last played

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = "76561198746733639";
const STEAM_OWNED_GAMES = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=1`;
const STEAM_CDN = (appid, file) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/${file}`;

exports.handler = async (event) => {
  try {
    const limit = parseInt(event.queryStringParameters?.limit) || 30;
    const { response } = await fetch(STEAM_OWNED_GAMES).then((res) => res.json());

    const games = (response.games ?? [])
      .filter((game) => game.playtime_forever > 0)
      .sort((a, b) => b.rtime_last_played - a.rtime_last_played)
      .slice(0, limit)
      .map((game) => ({
        appid: game.appid,
        name: game.name,
        hours: Math.round(game.playtime_forever / 60),
        lastPlayed: new Date(game.rtime_last_played * 1000).toISOString(),
        cover: STEAM_CDN(game.appid, "library_600x900.jpg"),
        coverFallback: STEAM_CDN(game.appid, "header.jpg"),
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

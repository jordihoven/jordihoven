const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token";

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  const response = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: STRAVA_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiresAt = data.expires_at * 1000;

  return accessToken;
}

exports.handler = async (event) => {
  try {
    const token = await getAccessToken();
    const limit = parseInt(event.queryStringParameters.limit) || 10;

    const response = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const activities = await response.json();

    if (!Array.isArray(activities)) {
      console.error("Strava API error:", JSON.stringify(activities));
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Strava API returned error", details: activities }),
      };
    }

    const formatted = activities.map((activity) => ({
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      start_date: activity.start_date,
      start_date_local: activity.start_date_local,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_heartrate: activity.average_heartrate,
      kilojoules: activity.kilojoules,
      calories: activity.calories,
      map: activity.map?.summary_polyline
        ? { polyline: activity.map.summary_polyline }
        : null,
      photos: activity.photos?.primary
        ? {
            url: activity.photos.primary.urls[0],
            source: activity.photos.primary.source,
          }
        : null,
      start_latlng: activity.start_latlng,
      end_latlng: activity.end_latlng,
      gear: activity.gear,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(formatted),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Strava activities" }),
    };
  }
};

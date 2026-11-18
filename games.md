# /games plan

## Playing lately

- `GetOwnedGames` already returns `playtime_2weeks` per game
- Show a small "recent: Xh" line/badge on games played in the last 2 weeks

## Cartridge style

- Render games as cartridges, N64 style
- Reference: [Socket](https://depmots.com/socket) does this nicely
- Similar "physical media" vibe as `app-blueray` on /movies

## Env var hack

- `STEAM_API_KEY` is marked secret in Netlify, so `netlify dev` can't read it
- Workaround: same key also set as the *Local development* value (not secret)
- Fix later: pick one approach (all secret + `.env`, or all non-secret like the other vars)

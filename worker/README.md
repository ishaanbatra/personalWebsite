# Spotify now-playing Worker

This Worker exchanges a Spotify refresh token server-side and exposes only the current track summary to the website. Keep all three Spotify values in Wrangler secrets; do not add them to `.env` or commit them.

## 1. Create the Spotify app

1. Create an app at [developer.spotify.com](https://developer.spotify.com/dashboard).
2. In the app settings, add this redirect URI exactly:

   ```text
   http://127.0.0.1:8888/callback
   ```

3. Copy the app's client ID and client secret for the next step.

## 2. Get a refresh token

Node.js 20 or newer is required. From this `worker` directory, run either:

```sh
SPOTIFY_CLIENT_ID=<client-id> SPOTIFY_CLIENT_SECRET=<client-secret> npm run get-refresh-token
```

or pass the two values as positional arguments:

```sh
npm run get-refresh-token -- <client-id> <client-secret>
```

Open the printed Spotify authorization URL, approve access, and return to the terminal. The script listens only on `127.0.0.1:8888`, verifies the OAuth state, prints the refresh token, and writes nothing to disk.

## 3. Configure and deploy the Worker

Install the Worker package and authenticate Wrangler:

```sh
npm install
npx wrangler login
```

Add each value when Wrangler prompts for it:

```sh
npx wrangler secret put SPOTIFY_CLIENT_ID
npx wrangler secret put SPOTIFY_CLIENT_SECRET
npx wrangler secret put SPOTIFY_REFRESH_TOKEN
```

Deploy the Worker:

```sh
npx wrangler deploy
```

Copy the deployed `https://...workers.dev` URL from Wrangler's output. Do not append a path.

## 4. Connect GitHub Pages

In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables**, create a repository variable named `NOW_PLAYING_URL`, and set it to the deployed Worker URL. The Pages workflow exposes that public URL to Vite as `VITE_NOW_PLAYING_URL` during its build.

For local frontend testing, copy the root `.env.example` to `.env.local` and replace its placeholder with the Worker URL. If the variable is absent or empty, the now-playing component remains hidden and makes no requests.

## Notes

- Cloudflare's Cache API is a no-op on `*.workers.dev`, so the Worker also keeps the access token in an isolate-local variable for 50 minutes. Token exchanges stay rare either way; putting the Worker on a custom route (e.g. `now-playing.ishaanbatra.com`) additionally enables the shared edge cache.
- The Worker only ever returns `{ "isPlaying": false }` on failure — never a 5xx — so the site degrades to hiding the band rather than showing an error.
- Browser CORS is restricted to `ishaanbatra.com`, `www.ishaanbatra.com`, and `http://localhost:5173`. Add origins to `ALLOWED_ORIGINS` in `src/index.ts` if that changes.

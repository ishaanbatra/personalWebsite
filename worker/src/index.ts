interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
}

interface SpotifyImage {
  url?: unknown;
  width?: unknown;
  height?: unknown;
}

interface SpotifyTrack {
  type?: unknown;
  name?: unknown;
  artists?: unknown;
  album?: unknown;
  external_urls?: unknown;
}

interface SpotifyCurrentlyPlaying {
  is_playing?: unknown;
  item?: unknown;
}

type NowPlayingResponse = {
  isPlaying: false;
} | {
  isPlaying: true;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
};

const TOKEN_CACHE_KEY = new Request('https://now-playing.internal/spotify-access-token');
const ALLOWED_ORIGINS = new Set([
  'https://ishaanbatra.com',
  'https://www.ishaanbatra.com',
  'http://localhost:5173',
]);

const responseHeaders = (request: Request) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=30',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  });
  const origin = request.headers.get('Origin');

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }

  return headers;
};

const jsonResponse = (request: Request, body: NowPlayingResponse) => new Response(
  JSON.stringify(body),
  { status: 200, headers: responseHeaders(request) },
);

// The Cache API is a no-op on *.workers.dev, so an isolate-local copy keeps the
// token exchange from running on every request there too.
let isolateToken: { value: string; expiresAt: number } | null = null;

const TOKEN_TTL_SECONDS = 3000;

const getAccessToken = async (env: Env): Promise<string | null> => {
  if (isolateToken && isolateToken.expiresAt > Date.now()) {
    return isolateToken.value;
  }

  const workerCache = (caches as CacheStorage & { default: Cache }).default;
  const cachedResponse = await workerCache.match(TOKEN_CACHE_KEY);

  if (cachedResponse) {
    return cachedResponse.text();
  }

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!tokenResponse.ok) {
    console.error('Spotify token exchange failed.');
    return null;
  }

  const tokenPayload: unknown = await tokenResponse.json();

  if (!tokenPayload || typeof tokenPayload !== 'object') {
    console.error('Spotify token response was invalid.');
    return null;
  }

  const accessToken = (tokenPayload as Record<string, unknown>).access_token;

  if (typeof accessToken !== 'string' || !accessToken) {
    console.error('Spotify token response omitted the access token.');
    return null;
  }

  isolateToken = { value: accessToken, expiresAt: Date.now() + TOKEN_TTL_SECONDS * 1000 };

  await workerCache.put(TOKEN_CACHE_KEY, new Response(accessToken, {
    headers: { 'Cache-Control': `max-age=${TOKEN_TTL_SECONDS}` },
  }));

  return accessToken;
};

const isRecord = (value: unknown): value is Record<string, unknown> => (
  value !== null && typeof value === 'object'
);

const getAlbumArt = (images: unknown): string | null => {
  if (!Array.isArray(images)) {
    return null;
  }

  const validImages = images.filter((image): image is SpotifyImage => (
    isRecord(image) && typeof image.url === 'string'
  ));
  // The band renders the art as a large square, so prefer the biggest
  // variant Spotify offers (typically 640px) over its 300px and 64px ones.
  const qualifyingImages = validImages
    .filter((image) => (
      typeof image.width === 'number'
      && typeof image.height === 'number'
      && image.width >= 64
      && image.height >= 64
    ))
    .sort((first, second) => (
      Math.min(second.width as number, second.height as number)
      - Math.min(first.width as number, first.height as number)
    ));

  return qualifyingImages[0]?.url as string | undefined
    ?? validImages[0]?.url as string | undefined
    ?? null;
};

const mapCurrentlyPlaying = (payload: SpotifyCurrentlyPlaying): NowPlayingResponse => {
  if (payload.is_playing !== true || !isRecord(payload.item)) {
    return { isPlaying: false };
  }

  const track = payload.item as SpotifyTrack;

  if (track.type !== 'track'
    || typeof track.name !== 'string'
    || !Array.isArray(track.artists)
    || !isRecord(track.album)
    || !isRecord(track.external_urls)) {
    return { isPlaying: false };
  }

  const artists = track.artists
    .filter(isRecord)
    .map((artist) => artist.name)
    .filter((name): name is string => typeof name === 'string' && name.length > 0);
  const albumName = track.album.name;
  const albumArt = getAlbumArt(track.album.images);
  const spotifyUrl = track.external_urls.spotify;

  if (!artists.length
    || typeof albumName !== 'string'
    || !albumArt
    || typeof spotifyUrl !== 'string') {
    return { isPlaying: false };
  }

  return {
    isPlaying: true,
    title: track.name,
    artist: artists.join(', '),
    album: albumName,
    albumArt,
    url: spotifyUrl,
  };
};

const fetchNowPlaying = async (env: Env): Promise<NowPlayingResponse> => {
  const accessToken = await getAccessToken(env);

  if (!accessToken) {
    return { isPlaying: false };
  }

  const spotifyResponse = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing?market=from_token',
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );

  if (spotifyResponse.status === 204) {
    return { isPlaying: false };
  }

  if (!spotifyResponse.ok) {
    console.error('Spotify currently-playing request failed.');
    return { isPlaying: false };
  }

  const responseText = await spotifyResponse.text();

  if (!responseText) {
    return { isPlaying: false };
  }

  return mapCurrentlyPlaying(JSON.parse(responseText) as SpotifyCurrentlyPlaying);
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: responseHeaders(request) });
    }

    const url = new URL(request.url);

    if (request.method !== 'GET' || url.pathname !== '/') {
      return jsonResponse(request, { isPlaying: false });
    }

    try {
      return jsonResponse(request, await fetchNowPlaying(env));
    } catch {
      console.error('Unable to retrieve the currently playing track.');
      return jsonResponse(request, { isPlaying: false });
    }
  },
};

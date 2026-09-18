import { randomBytes } from 'node:crypto';
import http from 'node:http';

const [clientIdArg, clientSecretArg] = process.argv.slice(2);
const clientId = process.env.SPOTIFY_CLIENT_ID || clientIdArg;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || clientSecretArg;
const redirectUri = 'http://127.0.0.1:8888/callback';

if (!clientId || !clientSecret) {
  console.error('Usage: SPOTIFY_CLIENT_ID=<id> SPOTIFY_CLIENT_SECRET=<secret> node scripts/get-refresh-token.mjs');
  console.error('   or: node scripts/get-refresh-token.mjs <client-id> <client-secret>');
  process.exit(1);
}

const state = randomBytes(32).toString('hex');
const authorizeUrl = new URL('https://accounts.spotify.com/authorize');
authorizeUrl.search = new URLSearchParams({
  client_id: clientId,
  response_type: 'code',
  redirect_uri: redirectUri,
  scope: 'user-read-currently-playing user-read-playback-state',
  state,
}).toString();

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || '/', redirectUri);

  if (requestUrl.pathname !== '/callback') {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found.');
    return;
  }

  if (requestUrl.searchParams.get('state') !== state) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('State verification failed. You can close this window.');
    console.error('Spotify authorization state verification failed.');
    process.exitCode = 1;
    server.close();
    return;
  }

  const authorizationError = requestUrl.searchParams.get('error');
  const code = requestUrl.searchParams.get('code');

  if (authorizationError || !code) {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Spotify authorization was not completed. You can close this window.');
    console.error('Spotify authorization did not return a code.');
    process.exitCode = 1;
    server.close();
    return;
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Token exchange failed.');
    }

    const tokenPayload = await tokenResponse.json();

    if (!tokenPayload || typeof tokenPayload.refresh_token !== 'string') {
      throw new Error('No refresh token returned.');
    }

    process.stdout.write(`${tokenPayload.refresh_token}\n`);
    console.error('Pass this value to: npx wrangler secret put SPOTIFY_REFRESH_TOKEN');
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Refresh token received. You can close this window.');
  } catch {
    console.error('Unable to exchange the Spotify authorization code.');
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Token exchange failed. You can close this window and try again.');
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.once('error', () => {
  console.error('Unable to start the callback server on 127.0.0.1:8888.');
  process.exitCode = 1;
});

server.listen(8888, '127.0.0.1', () => {
  console.error('Open this URL in your browser:');
  console.error(authorizeUrl.toString());
});

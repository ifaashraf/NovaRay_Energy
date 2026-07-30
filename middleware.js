export const config = {
  matcher: '/:path*',
};

// Vercel's internal fetch(request) to the static origin doesn't reliably
// pass through Content-Type, so it's re-derived from the file extension.
// Without it, browsers won't apply CSS/JS at all.
const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function guessContentType(pathname) {
  const path = pathname === '/' ? '/index.html' : pathname;
  const dot = path.lastIndexOf('.');
  if (dot === -1) return null;
  return CONTENT_TYPES[path.slice(dot)] || null;
}

export default async function middleware(request) {
  const response = await fetch(request);
  const headers = new Headers(response.headers);
  headers.set('Retry-After', '86400');

  const originalContentType = headers.get('content-type');
  const guessed = guessContentType(new URL(request.url).pathname);
  headers.set('X-Debug-Original-CT', originalContentType || '(none)');
  headers.set('X-Debug-Guessed-CT', guessed || '(none)');
  if (!originalContentType && guessed) {
    headers.set('content-type', guessed);
  }

  // A maintenance response must never be cached. Inheriting the origin
  // static file's ETag/Cache-Control let Vercel's CDN treat this as
  // revalidatable and keep re-serving an old cached copy (missing
  // Content-Type) on ETag match, since the underlying file content
  // doesn't change even when this middleware's code does.
  headers.set('Cache-Control', 'no-store, must-revalidate');
  headers.delete('etag');
  headers.delete('last-modified');
  headers.delete('age');
  headers.delete('x-vercel-cache');

  return new Response(response.body, {
    status: 503,
    statusText: 'Service Unavailable',
    headers,
  });
}

// Only the page document itself needs to carry the 503 + Retry-After
// maintenance signal (that's what search engines and browsers evaluate
// for the page's status). Static assets are excluded from this matcher
// entirely: Vercel's Edge Runtime silently strips Content-Type when
// middleware reconstructs a Response for these, which broke CSS/JS from
// ever being applied. Letting Vercel serve them natively (200, correct
// headers) sidesteps that platform quirk completely.
export const config = {
  matcher: [
    '/((?!.*\\.(?:css|js|mjs|json|png|jpg|jpeg|gif|svg|ico|webp|avif|woff|woff2|ttf|eot|txt|xml|map)$).*)',
  ],
};

export default async function middleware(request) {
  const response = await fetch(request);
  const headers = new Headers(response.headers);
  headers.set('Retry-After', '86400');

  // A maintenance response must never be cached. Inheriting the origin's
  // ETag/Cache-Control let Vercel's CDN treat this as revalidatable and
  // keep re-serving an old cached copy on ETag match, since the page's
  // content doesn't change even when this middleware's code does.
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

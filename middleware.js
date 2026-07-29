export const config = {
  matcher: '/:path*',
};

export default async function middleware(request) {
  const response = await fetch(request);
  const headers = new Headers(response.headers);
  headers.set('Retry-After', '86400');

  return new Response(response.body, {
    status: 503,
    statusText: 'Service Unavailable',
    headers,
  });
}

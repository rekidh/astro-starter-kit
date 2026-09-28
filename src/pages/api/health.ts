import type { APIRoute } from 'astro';

/** Endpoint health check untuk uptime monitor dan proses supervisor. */
export const prerender = false;

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // Jangan pernah di-cache: nilainya justru pada kesegarannya.
        'Cache-Control': 'private, no-store',
      },
    },
  );
};

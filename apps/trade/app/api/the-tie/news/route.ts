import { fetchNews } from 'server/theTie/fetchNews';

export async function GET() {
  try {
    const data = await fetchNews();
    return Response.json(data, {
      headers: {
        'Cache-Control': `public, max-age=120, stale-while-revalidate=120`,
      },
    });
  } catch (e) {
    return new Response((e as Error).message, {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

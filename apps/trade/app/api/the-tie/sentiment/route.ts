import { fetchSentimentData } from 'server/theTie/fetchSentimentData';

export async function GET() {
  try {
    const sentimentData = await fetchSentimentData();

    // keep sentiment data cached in CDN until the next minute
    const secondsUntilNextMinute = 60 - new Date().getSeconds();
    return Response.json(sentimentData, {
      headers: {
        'Cache-Control': `public, max-age=${secondsUntilNextMinute}`,
      },
    });
  } catch (e) {
    return new Response((e as Error).message, {
      status: 503,
      statusText: 'Service Unavailable',
    });
  }
}

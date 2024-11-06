import { MarketNewsItem } from 'common/types/integrations/MarketNewsItem';
import { uniqBy } from 'lodash';
import { fetchV2Data } from 'server/theTie/fetchV2Data';
import { getSupportedSymbolsByCoinUidMapping } from 'server/theTie/getSupportedSymbolsByCoinUidMapping';

/**
 * The Tie API response schema for the Vertex-custom /news endpoint
 */
interface TheTieNewsResponse {
  data: TheTieNewsItem[];
}

/**
 * Schema for each news item returned by The Tie API
 * We do lightly transform it to  MarketNewsItem after summary and source sanitization.
 *
 * @see MarketNewsItem
 */
interface TheTieNewsItem {
  headline: string;

  /**
   * Timestamp of the news article in YYYY-MM-DD HH:MM:SS format
   */
  timestamp: string;

  /**
   * URL to the news article
   */
  link: string;

  /**
   * AI summary of the news article
   * This field is sometimes 'NULL' or 'NULL.' which we sanitize to undefined for MarketNewsItem
   */
  gpt_summary: string | undefined;

  /**
   * coin_uids related to this news article
   */
  coin_uids: string[];
}

/** enough items to fill the News tab with only 1 coin in watchlist */
const MAX_ITEMS_PER_COIN = 15;
/** do not fetch articles that aren't "news" */
const MAX_LOOKBACK_IN_DAYS = 7;

function sanitizeGPTSummary(
  gptSummary: string | undefined,
): string | undefined {
  if (!gptSummary || gptSummary.includes('NULL')) {
    return undefined;
  }
  return gptSummary;
}

function getShortSourceNameFromUrl(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '');
}

/**
 * fetchNews fetches the latest news items for the tokens we support.
 *
 * @returns { MarketSentiment[] } latest news items sorted by timestamp (newest item first)
 */
export async function fetchNews(): Promise<MarketNewsItem[]> {
  const supportedCoinUids = await getSupportedSymbolsByCoinUidMapping();
  if (!supportedCoinUids.size) {
    throw new Error('symbols by coin uid mapping is empty');
  }

  const coinUidsToFetch = [...supportedCoinUids.keys()];
  const limit = coinUidsToFetch.length * MAX_ITEMS_PER_COIN;
  const { data: allItems } = await fetchV2Data<TheTieNewsResponse>(
    `/news?limit=${limit}&max_items_per_coin=${MAX_ITEMS_PER_COIN}&max_lookback_days=${MAX_LOOKBACK_IN_DAYS}&coin_uids=${coinUidsToFetch.join(',')}`,
  );

  // dedupe news items by headline to avoid showing the same headline multiple times
  // this happens commonly when multiple sources copy-paste the same press release
  const dedupedItems = uniqBy(allItems, 'headline');

  return dedupedItems.map((newsItem: TheTieNewsItem): MarketNewsItem => {
    const { headline, timestamp, link, gpt_summary, coin_uids } = newsItem;
    return {
      timestampMillis: new Date(timestamp).getTime(),
      headline,
      url: link,
      sourceName: getShortSourceNameFromUrl(link),
      summary: sanitizeGPTSummary(gpt_summary),
      symbols: coin_uids
        .map((coin_uid) => supportedCoinUids.get(coin_uid))
        .filter((symbol) => symbol !== undefined),
    };
  });
}

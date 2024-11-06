import { MarketSentiment } from 'common/types/integrations/MarketSentiment';
import { fetchV1Data } from 'server/theTie/fetchV1Data';
import { getSupportedSymbolsByCoinUidMapping } from 'server/theTie/getSupportedSymbolsByCoinUidMapping';

/**
 * The Tie's response schema for the sentiment endpoint
 */
interface TheTieCoinsSentimentResponse {
  data: TheTieCoinSentimentItem[];
}

/**
 * The Tie' sentiment schema returned for each coin
 * We do transform this into our own more usable and generic MarketSentiment type.
 *
 * @see MarketSentiment
 */
interface TheTieCoinSentimentItem {
  coin_uid: string;
  datetime: string;
  relative_tweet_volume: string;
  positive_tweets_percent: string;
  negative_tweets_percent: string;
  neutral_tweets_percent: string;
  tweet_volume: string;
  tweet_volume_30_day_avg: string;
  hourly_sentiment: string;
  long_term_sentiment: string;
  daily_sentiment: string;
}

/**
 * fetchSentimentData fetches the latest sentiment and tweet volume data for tokens we support.
 *
 * @returns {Record<string, MarketSentiment>} a map of coin symbols to their sentiment and tweet volume data
 */
export async function fetchSentimentData(): Promise<
  Record<string, MarketSentiment>
> {
  const coinUids = await getSupportedSymbolsByCoinUidMapping();
  if (!coinUids.size) {
    throw new Error('symbols by coin uid mapping is empty');
  }
  const sentimentData = await fetchV1Data<TheTieCoinsSentimentResponse>(
    `/recent?coin_uids=${[...coinUids.keys()].join(',')}`,
  );

  return sentimentData.data
    .map((coinSentiment: TheTieCoinSentimentItem): MarketSentiment | null => {
      const symbol = coinUids.get(coinSentiment.coin_uid);

      // while The Tie API returns 0-100 float scores, we only need integer precision, so save bandwidth by parsing as ints
      const hourlySentiment = parseInt(coinSentiment.hourly_sentiment);
      const dailySentiment = parseInt(coinSentiment.daily_sentiment);
      const longTermSentiment = parseInt(coinSentiment.long_term_sentiment);
      const tweetVolume1d = parseInt(coinSentiment.tweet_volume);
      const tweetVolumeAvg30d = parseInt(coinSentiment.tweet_volume_30_day_avg);

      // The Tie sometimes returns nulls for some symbols
      if (
        !symbol ||
        isNaN(hourlySentiment) ||
        isNaN(dailySentiment) ||
        isNaN(longTermSentiment) ||
        isNaN(tweetVolume1d) ||
        isNaN(tweetVolumeAvg30d)
      ) {
        // null items are filtered out after mapping
        return null;
      }

      // for display purposes, we calculate the 30-day tweet volume from the average
      const tweetVolume30d = tweetVolumeAvg30d * 30;

      // while The Tie API provides relative_tweet_volume, it is wasteful in precision and sometimes incorrect
      // (eg. -1 where calculation would NaN)
      // as such, we calculate it ourselves to be safe and use meaningful precision (rounded to percent)
      const changePercentage = tweetVolume1d / tweetVolumeAvg30d - 1;
      const tweetVolumeRelativeChange = isNaN(changePercentage)
        ? 0
        : Math.round(changePercentage * 100) / 100;

      return {
        symbol,
        sentiment: {
          ['1d']: dailySentiment,
          ['30d']: longTermSentiment,
        },
        tweets: {
          ['1d']: tweetVolume1d,
          ['30d']: tweetVolume30d,
          avg30d: tweetVolumeAvg30d,
          change: tweetVolumeRelativeChange,
        },
      };
    })
    .reduce(
      (
        acc: Record<string, MarketSentiment>,
        marketSentiment: MarketSentiment | null,
      ) => {
        if (marketSentiment) {
          acc[marketSentiment.symbol] = marketSentiment;
        }
        return acc;
      },
      {},
    );
}

/**
 * MarketSentiment represents the sentiment for a token.
 * It includes the sentiment scores for the token and the tweet volume data.
 */
export interface MarketSentiment {
  /**
   * The symbol of the token this sentiment data is for.
   */
  symbol: string;

  /**
   * The tweet volume data for the token.
   */
  tweets: {
    /**
     * The tweet volume for the token in last 24 hours.
     */
    ['1d']: number;
    /**
     * The tweet volume for the token in last 30 days.
     */
    ['30d']: number;

    /**
     * The daily average tweet volume for the token in last 30 days.
     */
    avg30d: number;

    /**
     * The relative change in tweet volume for the token in last 24 hours compared to the average of last 30 days.
     * This is a percentage value where 1.00 represents 100%.
     * Note the value can exceed 100%, eg. 20.00 (+2000%) is a possible value (sudden tweet volume surge).
     */
    change: number;
  };

  /**
   * The sentiment scores for the token.
   * These are integers between 0 (very bearish) to 100 (very bullish).
   */
  sentiment: {
    /**
     * Sentiment score for the last 24 hours.
     */
    ['1d']: number;

    /**
     * Sentiment score for the last 30 days.
     */
    ['30d']: number;
  };
}

/*
 * MarketNewsItem represents a news item/article.
 */
export interface MarketNewsItem {
  timestampMillis: number;
  headline: string;
  url: string;

  /**
   * Display name for the source of the article.
   */
  sourceName: string | undefined;

  /**
   * A summary of the article, or undefined if no summary is unavailable.
   */
  summary: string | undefined;

  /**
   * Symbols related to this news article.
   */
  symbols: string[];
}

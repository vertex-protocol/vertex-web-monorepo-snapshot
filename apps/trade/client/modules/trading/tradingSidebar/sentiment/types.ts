import { MarketSentiment } from 'common/types/integrations/MarketSentiment';
import { SharedProductMetadata } from '@vertex-protocol/metadata';

export type SentimentTimeframe = '1d' | '30d';

export interface SentimentTabItemData {
  marketSentiment: MarketSentiment;
  metadata: SharedProductMetadata;
  href: string;
}

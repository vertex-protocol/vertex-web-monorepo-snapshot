import theTieLogo from 'client/assets/partners/the-tie-logo.png';
import { API_ROUTES } from 'client/modules/app/consts/apiRoutes';
import { StaticImageData } from 'next/image';

interface MarketSentimentProvider {
  /** Whether to enable sentiment query and UI */
  enabled: boolean;
  /** Name of the sentiment provider */
  name: string;
  /** Optional provider logo to show in sentiment tab */
  logo?: StaticImageData;
  /** URL for sentiment query */
  url: string;
  /** Refetch interval */
  refetchInterval: number;
}

export const MARKET_SENTIMENT_PROVIDER: MarketSentimentProvider = {
  enabled: true,
  name: 'The Tie',
  logo: theTieLogo,
  url: API_ROUTES.theTieSentiment,
  refetchInterval: 60000,
};

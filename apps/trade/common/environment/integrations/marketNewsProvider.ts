import theTieLogo from 'client/assets/partners/the-tie-logo.png';
import { API_ROUTES } from 'client/modules/app/consts/apiRoutes';
import { StaticImageData } from 'next/image';

interface MarketNewsProvider {
  /** Whether to enable news query and UI */
  enabled: boolean;
  /** Name of the news provider */
  name: string;
  /** Optional provider logo to show in News tab */
  logo?: StaticImageData;
  /** URL for news query */
  url: string;
  /** Refetch interval */
  refetchInterval: number;
}

export const MARKET_NEWS_PROVIDER: MarketNewsProvider = {
  enabled: true,
  name: 'The Tie',
  logo: theTieLogo,
  url: API_ROUTES.theTieNews,
  refetchInterval: 120000,
};

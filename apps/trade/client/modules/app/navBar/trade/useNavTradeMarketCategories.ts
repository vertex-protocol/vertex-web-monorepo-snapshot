import { MarketCategory } from '@vertex-protocol/react-client';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { ReactNode } from 'react';

interface NavMarketCategory {
  title: ReactNode;
  description: string;
  // Destination link when clicking on the mobile nav item
  href: string;
  marketCategory: MarketCategory;
}

const PERPS: NavMarketCategory = {
  title: 'Perps',
  description: 'Trade perp contracts',
  href: ROUTES.perpTrading,
  marketCategory: 'perp',
};

const SPOT: NavMarketCategory = {
  title: 'Spot',
  description: 'Buy and sell tokens',
  href: ROUTES.spotTrading,
  marketCategory: 'spot',
};

export function useNavTradeMarketCategories() {
  const { isSpotTradingEnabled } = useEnabledFeatures();
  return isSpotTradingEnabled ? [PERPS, SPOT] : [PERPS];
}

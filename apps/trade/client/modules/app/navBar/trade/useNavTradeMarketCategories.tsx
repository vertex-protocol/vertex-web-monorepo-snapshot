import {
  ELECTION_PRODUCT_IDS,
  MarketCategory,
} from '@vertex-protocol/metadata';
import { NewPill } from 'client/components/NewPill';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { first, get } from 'lodash';
import { ReactNode } from 'react';

interface NavMarketCategory {
  title: ReactNode;
  description: string;
  // Destination link when clicking on the mobile nav item
  href: string;
  // Routes to match for active button state (can be removed after election markets are removed)
  activeRouteHrefs: string[];
  marketCategory: MarketCategory;
}

const MARKET_CATEGORIES: NavMarketCategory[] = [
  {
    title: 'Perps',
    description: 'Trade perp contracts',
    href: ROUTES.perpTrading,
    activeRouteHrefs: [ROUTES.perpTrading],
    marketCategory: 'perp',
  },
  {
    title: 'Spot',
    description: 'Buy and sell tokens',
    href: ROUTES.spotTrading,
    activeRouteHrefs: [ROUTES.spotTrading],
    marketCategory: 'spot',
  },
];

export function useNavTradeMarketCategories(): NavMarketCategory[] {
  const { isElectionMarketsEnabled } = useEnabledFeatures();
  const productTradingLinks = useProductTradingLinks();

  const electionActiveRouteHrefs = ELECTION_PRODUCT_IDS.map((productId) => {
    return get(productTradingLinks, productId, undefined)?.link;
  }).filter(nonNullFilter);

  return isElectionMarketsEnabled
    ? [
        ...MARKET_CATEGORIES,
        {
          title: (
            <>
              Prediction <NewPill />
            </>
          ),
          description: 'Trade U.S. election prediction markets',
          href: first(electionActiveRouteHrefs) ?? ROUTES.spotTrading,
          activeRouteHrefs: electionActiveRouteHrefs,
          marketCategory: 'prediction',
        },
      ]
    : MARKET_CATEGORIES;
}

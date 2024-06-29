import { WithClassnames } from '@vertex-protocol/web-common';
import { ROUTES } from 'client/modules/app/consts/routes';
import { DesktopMoreLinksPopover } from 'client/modules/app/navBar/moreLinks/DesktopMoreLinksPopover';
import { MobileMoreLinksCollapsible } from 'client/modules/app/navBar/moreLinks/MobileMoreLinksCollapsible';
import { BlitzCompetitionNavItemButton } from 'client/modules/app/navBar/tradingCompetition/BlitzCompetitionNavItemButton';
import { MantleCompetitionNavItemButton } from 'client/modules/app/navBar/tradingCompetition/MantleCompetitionNavItemButton';
import {
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { clientEnv } from 'common/environment/clientEnv';
import { ReactNode, useMemo } from 'react';
import { DesktopEarnPopover } from '../earn/DesktopEarnPopover';
import { MobileEarnCollapsible } from '../earn/MobileEarnCollapsible';
import { DesktopPointsNavItemButton } from '../points/DesktopPointsNavItemButton';
import { MobilePointsNavItemButton } from '../points/MobilePointsNavItemButton';
import { DesktopNavMarketSwitcher } from '../trade/DesktopNavMarketSwitcher/DesktopNavMarketSwitcher';
import { MobileNavTradeCollapsible } from '../trade/MobileNavTradeCollapsible';

interface BaseAppNavItem {
  id: string;
}

export interface AppNavLinkItem extends BaseAppNavItem {
  type: 'link';
  href: string;
  // Used in conjunction with `query` to conditionally identify a selected route can have sub-routes in the Navbar.
  // ex. '/app/portfolio/overview' returns `pathname` of '/app/portfolio/[page]'
  //     '/app/portfolio/overview' returns `asPath` of '/app/portfolio/' which we compare with the basePath.
  // see https://nextjs.org/docs/routing/dynamic-routes for more info
  // for implementation of logic, see useGetIsActiveRoute
  basePath: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface AppNavCustomItem extends BaseAppNavItem {
  type: 'custom';
  content: {
    Desktop: React.ElementType;
    Mobile: React.ElementType<WithClassnames>;
  };
}

export type AppNavItem = AppNavLinkItem | AppNavCustomItem;

const BLITZ_NAV_ITEMS: AppNavItem[] = [
  {
    id: 'points',
    type: 'custom',
    content: {
      Desktop: DesktopPointsNavItemButton,
      Mobile: MobilePointsNavItemButton,
    },
  },
  {
    id: 'blitz_trading_competition',
    type: 'custom',
    content: {
      Desktop: BlitzCompetitionNavItemButton,
      Mobile: () => <BlitzCompetitionNavItemButton withMobilePadding />,
    },
  },
];

const MANTLE_TRADING_COMPETITION: AppNavItem = {
  id: 'mantle_trading_competition',
  type: 'custom',
  content: {
    Desktop: () => <MantleCompetitionNavItemButton />,
    Mobile: () => (
      <MantleCompetitionNavItemButton
        withMobilePadding
        // On mobile, when a collapsible item above this element is opened, the left
        // border of its list of items touches the top of this element, which stands
        // out due to its bg color. So we give it some extra space here.
        className="mt-2"
      />
    ),
  },
};

export function useAppNavItems() {
  const showBlitzNavItems = useIsEnabledForChainIds(BLAST_CHAIN_IDS);
  const showMantleTradingCompetition =
    useIsEnabledForChainIds(MANTLE_CHAIN_IDS);

  return useMemo(
    () =>
      [
        {
          id: 'portfolio',
          type: 'link',
          href: ROUTES.portfolio.overview,
          label: 'Portfolio',
          basePath: ROUTES.portfolio.base,
        },
        {
          id: 'trade',
          type: 'custom',
          content: {
            Desktop: DesktopNavMarketSwitcher,
            Mobile: MobileNavTradeCollapsible,
          },
        },
        {
          id: 'earn',
          type: 'custom',
          content: {
            Desktop: DesktopEarnPopover,
            Mobile: MobileEarnCollapsible,
          },
        },
        {
          id: 'markets',
          type: 'link',
          href: ROUTES.markets,
          label: 'Markets',
          basePath: ROUTES.markets,
        },
        ...(showBlitzNavItems ? BLITZ_NAV_ITEMS : []),
        {
          id: 'more',
          type: 'custom',
          content: {
            Desktop: DesktopMoreLinksPopover,
            Mobile: MobileMoreLinksCollapsible,
          },
        },
        ...(showMantleTradingCompetition ? [MANTLE_TRADING_COMPETITION] : []),
      ] as AppNavItem[],
    [showBlitzNavItems, showMantleTradingCompetition],
  );
}

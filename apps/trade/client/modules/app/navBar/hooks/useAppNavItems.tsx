import { WithClassnames } from '@vertex-protocol/web-common';
import { ROUTES } from 'client/modules/app/consts/routes';
import { DesktopEarnPopover } from 'client/modules/app/navBar/earn/DesktopEarnPopover';
import { MobileEarnCollapsible } from 'client/modules/app/navBar/earn/MobileEarnCollapsible';
import { DesktopMoreLinksPopover } from 'client/modules/app/navBar/moreLinks/DesktopMoreLinksPopover';
import { MobileMoreLinksCollapsible } from 'client/modules/app/navBar/moreLinks/MobileMoreLinksCollapsible';
import { DesktopNavMarketSwitcher } from 'client/modules/app/navBar/trade/DesktopNavMarketSwitcher/DesktopNavMarketSwitcher';
import { MobileNavTradeCollapsible } from 'client/modules/app/navBar/trade/MobileNavTradeCollapsible';
import { BLAST_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { ReactNode, useMemo } from 'react';

interface BaseAppNavItem {
  id: string;
}

export interface AppNavLinkItem extends BaseAppNavItem {
  type: 'link';
  href: string;
  // Used in conjunction with `pathname` to conditionally identify a selected route.
  // see https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes for more info
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
    id: 'rewards',
    type: 'link',
    href: ROUTES.rewards,
    label: 'Rewards',
    basePath: ROUTES.rewards,
  },
  // {
  //   id: 'blitz_trading_competition',
  //   type: 'custom',
  //   content: {
  //     Desktop: BlitzCompetitionNavItemButton,
  //     Mobile: () => <BlitzCompetitionNavItemButton withMobilePadding />,
  //   },
  // },
];

export function useAppNavItems() {
  const showBlitzNavItems = useIsEnabledForChainIds(BLAST_CHAIN_IDS);
  // const showVertexTradingCompetitionsPopover = useIsEnabledForBrand(['vertex']);

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
          id: 'markets',
          type: 'link',
          href: ROUTES.markets,
          label: 'Markets',
          basePath: ROUTES.markets,
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
        // ...(showVertexTradingCompetitionsPopover
        //   ? [
        //       {
        //         id: 'tradingCompetitions',
        //         type: 'custom',
        //         content: {
        //           Desktop: DesktopTradingCompetitionsPopover,
        //           Mobile: MobileTradingCompetitionsCollapsible,
        //         },
        //       },
        //     ]
        //   : []),
        ...(showBlitzNavItems ? BLITZ_NAV_ITEMS : []),
        {
          id: 'more',
          type: 'custom',
          content: {
            Desktop: DesktopMoreLinksPopover,
            Mobile: MobileMoreLinksCollapsible,
          },
        },
      ] as AppNavItem[],
    [showBlitzNavItems],
  );
}

import { WithClassnames } from '@vertex-protocol/web-common';
import { ROUTES } from 'client/modules/app/consts/routes';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/chainSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/chainSpecificContent/hooks/useIsEnabledForChainIds';
import { DesktopMoreLinksPopover } from 'client/modules/navigation/moreLinks/DesktopMoreLinksPopover';
import { MobileMoreLinksCollapsible } from 'client/modules/navigation/moreLinks/MobileMoreLinksCollapsible';
import { DesktopPointsNavItemButton } from 'client/modules/navigation/points/DesktopPointsNavItemButton';
import { MobilePointsNavItemButton } from 'client/modules/navigation/points/MobilePointsNavItemButton';
import { DesktopVrtxPopover } from 'client/modules/navigation/vrtx/DesktopVrtxPopover';
import { MobileVrtxCollapsible } from 'client/modules/navigation/vrtx/MobileVrtxCollapsible';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';
import { DesktopNavTradeSwitcher } from '../trade/DesktopNavTradeSwitcher/DesktopNavTradeSwitcher';
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

const REWARDS_POPOVER_NAV_ITEM: AppNavItem = {
  id: 'rewards',
  type: 'custom',
  content: {
    Mobile: MobileVrtxCollapsible,
    Desktop: DesktopVrtxPopover,
  },
};

const REWARDS_LINK_NAV_ITEM: AppNavItem = {
  id: 'rewards',
  type: 'link',
  href: ROUTES.rewards,
  label: (
    <div className="flex items-center gap-x-1.5">
      <Image
        src={VRTX_TOKEN_INFO.icon.asset}
        alt={VRTX_TOKEN_INFO.symbol}
        className="aspect-square w-4"
      />
      Rewards
    </div>
  ),
  basePath: ROUTES.rewards,
};

const REFERRALS_NAV_ITEM: AppNavItem = {
  id: 'referrals',
  type: 'link',
  href: ROUTES.referrals,
  label: 'Referrals',
  basePath: ROUTES.referrals,
};

const POINTS_NAV_ITEM: AppNavItem = {
  id: 'points',
  type: 'custom',
  content: {
    Desktop: DesktopPointsNavItemButton,
    Mobile: MobilePointsNavItemButton,
  },
};

export function useAppNavItems() {
  const showReferralsNavItem = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showRewardsPopoverNavItem = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showRewardsLinkNavItem = useIsEnabledForChainIds(MANTLE_CHAIN_IDS);
  const showPointsNavItem = useIsEnabledForChainIds(BLAST_CHAIN_IDS);

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
            Desktop: DesktopNavTradeSwitcher,
            Mobile: MobileNavTradeCollapsible,
          },
        },
        {
          id: 'pools',
          type: 'link',
          href: ROUTES.pools,
          label: 'Pools',
          basePath: ROUTES.pools,
        },
        {
          id: 'markets',
          type: 'link',
          href: ROUTES.markets,
          label: 'Markets',
          basePath: ROUTES.markets,
        },
        ...(showRewardsPopoverNavItem ? [REWARDS_POPOVER_NAV_ITEM] : []),
        ...(showRewardsLinkNavItem ? [REWARDS_LINK_NAV_ITEM] : []),
        ...(showReferralsNavItem ? [REFERRALS_NAV_ITEM] : []),
        ...(showPointsNavItem ? [POINTS_NAV_ITEM] : []),
        {
          id: 'more',
          type: 'custom',
          content: {
            Desktop: DesktopMoreLinksPopover,
            Mobile: MobileMoreLinksCollapsible,
          },
        },
      ] as AppNavItem[],
    [
      showPointsNavItem,
      showReferralsNavItem,
      showRewardsLinkNavItem,
      showRewardsPopoverNavItem,
    ],
  );
}

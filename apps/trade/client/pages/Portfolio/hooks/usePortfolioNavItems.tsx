import { useEVMContext } from '@vertex-protocol/react-client';
import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { PORTFOLIO_SUBROUTES } from 'client/modules/app/consts/routes';
import { PortfolioNavItem } from 'client/pages/Portfolio/components/navigation/types';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export function usePortfolioNavItems() {
  const {
    primaryChainMetadata: { isTestnet },
  } = useEVMContext();
  const { query } = useRouter();
  const { numOpenOrders, numPerpPositions, numLpPositions } =
    useSubaccountCountIndicators();

  const getIsSelected = useCallback(
    (href: string) => {
      if (typeof query.page !== 'string') {
        return false;
      }
      return href.toLowerCase() === query.page.toLowerCase();
    },
    [query.page],
  );

  return useMemo((): PortfolioNavItem[] => {
    const navItems = [
      {
        label: 'Overview',
        href: PORTFOLIO_SUBROUTES.overview,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.overview),
      },
      {
        label: 'Balances',
        href: PORTFOLIO_SUBROUTES.balances,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.balances),
      },
      {
        label: 'Perp Positions',
        href: PORTFOLIO_SUBROUTES.positions,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.positions),
        associatedCount: numPerpPositions,
      },
      {
        label: 'Pools',
        href: PORTFOLIO_SUBROUTES.pools,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.pools),
        associatedCount: numLpPositions,
      },
      {
        label: 'Open Orders',
        href: PORTFOLIO_SUBROUTES.orders,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.orders),
        associatedCount: numOpenOrders,
      },
      {
        label: 'Margin Manager',
        href: PORTFOLIO_SUBROUTES.marginManager,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.marginManager),
      },
      {
        label: 'History',
        href: PORTFOLIO_SUBROUTES.history,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.history),
      },
      {
        label: 'FAQ',
        href: PORTFOLIO_SUBROUTES.faq,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.faq),
      },
    ];
    if (isTestnet) {
      navItems.push({
        label: 'Faucet',
        href: PORTFOLIO_SUBROUTES.faucet,
        selected: getIsSelected(PORTFOLIO_SUBROUTES.faucet),
      });
    }
    return navItems;
  }, [
    getIsSelected,
    isTestnet,
    numLpPositions,
    numOpenOrders,
    numPerpPositions,
  ]);
}

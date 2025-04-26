import { useSubaccountCountIndicators } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { PORTFOLIO_SUBROUTES, ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioNavItem } from 'client/pages/Portfolio/components/navigation/types';
import { clientEnv } from 'common/environment/clientEnv';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export function usePortfolioNavItems() {
  const pathname = usePathname();
  const { numOpenOrders, numPerpPositions } = useSubaccountCountIndicators();

  const getIsSelected = useCallback(
    (route: string) => {
      return pathname.toLowerCase() === route.toLowerCase();
    },
    [pathname],
  );

  return useMemo((): PortfolioNavItem[] => {
    const navItems = [
      {
        label: 'Overview',
        href: PORTFOLIO_SUBROUTES.overview,
        selected: getIsSelected(ROUTES.portfolio.overview),
      },
      {
        label: 'Balances',
        href: PORTFOLIO_SUBROUTES.balances,
        selected: getIsSelected(ROUTES.portfolio.balances),
      },
      {
        label: 'Perp Positions',
        href: PORTFOLIO_SUBROUTES.positions,
        selected: getIsSelected(ROUTES.portfolio.positions),
        associatedCount: numPerpPositions,
      },
      {
        label: 'Open Orders',
        href: PORTFOLIO_SUBROUTES.orders,
        selected: getIsSelected(ROUTES.portfolio.orders),
        associatedCount: numOpenOrders,
      },
      {
        label: 'Margin Manager',
        href: PORTFOLIO_SUBROUTES.marginManager,
        selected: getIsSelected(ROUTES.portfolio.marginManager),
      },
      {
        label: 'History',
        href: PORTFOLIO_SUBROUTES.history,
        selected: getIsSelected(ROUTES.portfolio.history),
      },
    ];
    if (clientEnv.isTestnetDataEnv) {
      navItems.push({
        label: 'Faucet',
        href: PORTFOLIO_SUBROUTES.faucet,
        selected: getIsSelected(ROUTES.portfolio.faucet),
      });
    }
    return navItems;
  }, [getIsSelected, numOpenOrders, numPerpPositions]);
}

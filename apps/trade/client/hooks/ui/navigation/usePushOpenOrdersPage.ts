import { ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioOpenOrdersTabID } from 'client/pages/Portfolio/subpages/OpenOrders/hooks/usePortfolioOpenOrderTabs';
import { portfolioOpenOrdersTabIdAtom } from 'client/store/portfolioStore';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function usePushOpenOrdersPage() {
  const router = useRouter();
  const [, setPortfolioOpenOrdersTabId] = useAtom(portfolioOpenOrdersTabIdAtom);

  return useCallback(
    (tabId: PortfolioOpenOrdersTabID) => {
      setPortfolioOpenOrdersTabId(tabId);
      router.push(ROUTES.portfolio.orders);
    },
    [router, setPortfolioOpenOrdersTabId],
  );
}

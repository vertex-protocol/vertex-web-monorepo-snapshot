import { ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioHistoryTabID } from 'client/pages/Portfolio/subpages/History/hooks/usePortfolioHistoryTabs';
import { portfolioHistoryTabIdAtom } from 'client/store/portfolioStore';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function usePushHistoryPage() {
  const router = useRouter();
  const [, setPortfolioHistoryTabId] = useAtom(portfolioHistoryTabIdAtom);

  return useCallback(
    (tabId: PortfolioHistoryTabID) => {
      setPortfolioHistoryTabId(tabId);
      router.push(ROUTES.portfolio.history);
    },
    [router, setPortfolioHistoryTabId],
  );
}

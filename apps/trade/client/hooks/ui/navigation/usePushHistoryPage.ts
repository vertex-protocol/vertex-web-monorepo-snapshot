import { ROUTES } from 'client/modules/app/consts/routes';
import { PortfolioHistoryTabID } from 'client/pages/Portfolio/subpages/History/types';
import { portfolioHistoryTabIdAtom } from 'client/store/portfolioStore';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function usePushHistoryPage() {
  const { push } = useRouter();
  const [, setPortfolioHistoryTabId] = useAtom(portfolioHistoryTabIdAtom);

  return useCallback(
    (tabId: PortfolioHistoryTabID) => {
      setPortfolioHistoryTabId(tabId);
      push(ROUTES.portfolio.history);
    },
    [push, setPortfolioHistoryTabId],
  );
}

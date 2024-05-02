import { useEVMContext } from '@vertex-protocol/web-data';
import { PORTFOLIO_SUBROUTES } from 'client/modules/app/consts/routes';
import { useRouter } from 'next/router';
import { ElementType, useMemo } from 'react';
import { PortfolioBalancesPage } from '../subpages/Balances/PortfolioBalancesPage';
import { PortfolioFaqPage } from '../subpages/Faq/PortfolioFaqPage';
import { PortfolioFaucetPage } from '../subpages/Faucet/PortfolioFaucetPage';
import { PortfolioHistoryPage } from '../subpages/History/PortfolioHistoryPage';
import { PortfolioMarginManagerPage } from '../subpages/MarginManager/PortfolioMarginManagerPage';
import { PortfolioOpenOrdersPage } from '../subpages/OpenOrders/PortfolioOpenOrdersPage';
import { PortfolioOverviewPage } from '../subpages/Overview/PortfolioOverviewPage';
import { PortfolioPerpetualsPage } from '../subpages/Perpetuals/PortfolioPerpetualsPage';
import { PortfolioPoolsPage } from '../subpages/Pools/PortfolioPoolsPage';

interface PortfolioRoute {
  title: string;
  Component: ElementType;
}

const PORTFOLIO_ROUTES = {
  overview: {
    title: 'Overview',
    Component: PortfolioOverviewPage,
  },
  balances: {
    title: 'Balances',
    Component: PortfolioBalancesPage,
  },
  positions: {
    title: 'Positions',
    Component: PortfolioPerpetualsPage,
  },
  orders: {
    title: 'Orders',
    Component: PortfolioOpenOrdersPage,
  },
  marginManager: {
    title: 'Margin Manager',
    Component: PortfolioMarginManagerPage,
  },
  history: {
    title: 'History',
    Component: PortfolioHistoryPage,
  },
  faq: {
    title: 'FAQ',
    Component: PortfolioFaqPage,
  },
  pools: {
    title: 'Pools',
    Component: PortfolioPoolsPage,
  },
  faucet: {
    title: 'Faucet',
    Component: PortfolioFaucetPage,
  },
};

export const usePortfolioPage = () => {
  const {
    primaryChainMetadata: { isTestnet },
  } = useEVMContext();
  const { query } = useRouter();

  return useMemo((): PortfolioRoute => {
    switch (query?.page) {
      case PORTFOLIO_SUBROUTES.overview:
        return PORTFOLIO_ROUTES.overview;
      case PORTFOLIO_SUBROUTES.balances:
        return PORTFOLIO_ROUTES.balances;
      case PORTFOLIO_SUBROUTES.positions:
        return PORTFOLIO_ROUTES.positions;
      case PORTFOLIO_SUBROUTES.orders:
        return PORTFOLIO_ROUTES.orders;
      case PORTFOLIO_SUBROUTES.marginManager:
        return PORTFOLIO_ROUTES.marginManager;
      case PORTFOLIO_SUBROUTES.history:
        return PORTFOLIO_ROUTES.history;
      case PORTFOLIO_SUBROUTES.faq:
        return PORTFOLIO_ROUTES.faq;
      case PORTFOLIO_SUBROUTES.pools:
        return PORTFOLIO_ROUTES.pools;
      case PORTFOLIO_SUBROUTES.faucet:
        if (isTestnet) {
          return PORTFOLIO_ROUTES.faucet;
        }
        return PORTFOLIO_ROUTES.overview;
      default:
        return PORTFOLIO_ROUTES.overview;
    }
  }, [isTestnet, query?.page]);
};

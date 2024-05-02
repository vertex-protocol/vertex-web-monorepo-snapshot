import { ChartTimespan } from 'client/pages/Portfolio/charts/types';
import { PortfolioHistoryTabID } from 'client/pages/Portfolio/subpages/History/hooks/usePortfolioHistoryTabs';
import { PortfolioOpenOrdersTabID } from 'client/pages/Portfolio/subpages/OpenOrders/hooks/usePortfolioOpenOrderTabs';
import { atom } from 'jotai';

export const portfolioOpenOrdersTabIdAtom =
  atom<PortfolioOpenOrdersTabID>('engine_orders');

export const portfolioHistoryTabIdAtom = atom<PortfolioHistoryTabID>('trades');

export const portfolioChartTimespanAtom = atom<ChartTimespan>('24hr');

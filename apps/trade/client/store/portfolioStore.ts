import { PortfolioChartTimespan } from 'client/pages/Portfolio/charts/types';
import { PortfolioHistoryTabID } from 'client/pages/Portfolio/subpages/History/types';
import { PortfolioOpenOrdersTabID } from 'client/pages/Portfolio/subpages/OpenOrders/types';
import { atom } from 'jotai';

export const portfolioOpenOrdersTabIdAtom =
  atom<PortfolioOpenOrdersTabID>('engine_orders');

export const portfolioHistoryTabIdAtom = atom<PortfolioHistoryTabID>('trades');

export const portfolioChartTimespanAtom = atom<PortfolioChartTimespan>('24h');

import { OrderbookViewType } from 'client/modules/trading/marketOrders/orderbook/types';
import {
  HistoricalTradesFilterOptionID,
  OpenOrdersFilterOptionID,
  RealizedPnlEventsFilterOptionID,
} from 'client/store/trading/types';
import { atom } from 'jotai';

// Orderbook state
export const orderbookViewTypeAtom = atom<OrderbookViewType>('bids_and_asks');

export const marketTradesExpandedStateAtom = atom<
  'full' | 'default' | 'collapsed'
>('default');

// Table filters
export const historicalTradesSelectedFilterIdAtom =
  atom<HistoricalTradesFilterOptionID>('all');

export const realizedPnlEventsSelectedFilterIdAtom =
  atom<RealizedPnlEventsFilterOptionID>('all');

export const openEngineOrdersSelectedFilterIdAtom =
  atom<OpenOrdersFilterOptionID>('all');

export const openTriggerOrdersSelectedFilterIdAtom =
  atom<OpenOrdersFilterOptionID>('all');

// Market switcher
export const openMarketSwitcherAtom = atom<boolean>(false);

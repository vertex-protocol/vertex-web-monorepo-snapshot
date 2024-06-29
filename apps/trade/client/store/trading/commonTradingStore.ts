import { OrderbookViewType } from 'client/modules/trading/marketOrders/orderbook/types';
import {
  HistoricalTradesFilterOptionID,
  OpenOrdersFilterOptionID,
  RealizedPnlEventsFilterOptionID,
} from 'client/store/trading/types';
import { atom } from 'jotai';

// Orderbook state
export const orderbookViewTypeAtom = atom<OrderbookViewType>('bids_and_asks');

export const marketActivitySelectedTabIdAtom = atom<'orderbook' | 'trades'>(
  'orderbook',
);

// Table filters
export const historicalTradesSelectedFilterIdAtom =
  atom<HistoricalTradesFilterOptionID>('all');

export const realizedPnlEventsSelectedFilterIdAtom =
  atom<RealizedPnlEventsFilterOptionID>('all');

export const openEngineOrdersSelectedFilterIdAtom =
  atom<OpenOrdersFilterOptionID>('all');

export const openTriggerOrdersSelectedFilterIdAtom =
  atom<OpenOrdersFilterOptionID>('all');

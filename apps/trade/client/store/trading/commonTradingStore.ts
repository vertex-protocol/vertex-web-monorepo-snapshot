import { OrderbookViewType } from 'client/modules/trading/marketOrders/orderbook/types';
import { atom } from 'jotai';

// Orderbook state
export const orderbookViewTypeAtom = atom<OrderbookViewType>('bids_and_asks');

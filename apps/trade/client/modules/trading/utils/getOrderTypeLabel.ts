import { OrderType } from 'client/modules/trading/types';

export function getOrderTypeLabel(orderType: OrderType) {
  return {
    limit: 'Limit',
    market: 'Market',
    stop: 'Stop Market',
    limit_reduce: 'Limit Reduce',
    market_reduce: 'Market Reduce',
    take_profit: 'Take Profit',
    stop_loss: 'Stop Loss',
  }[orderType];
}

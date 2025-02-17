import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { OrderType } from 'client/modules/trading/types';

export function getOrderTypeLabel(
  orderType: OrderType,
  marginModeType?: MarginModeType,
) {
  const orderTypeLabel = {
    limit: 'Limit',
    market: 'Market',
    stop: 'Stop Market',
    limit_reduce: 'Limit Reduce',
    market_reduce: 'Market Reduce',
    take_profit: 'Take Profit',
    stop_loss: 'Stop Loss',
  }[orderType];

  if (!marginModeType) {
    return orderTypeLabel;
  }

  // Append margin mode (Iso/Cross) to orderTypeLabel if marginModeType is defined.
  return `${orderTypeLabel} (${marginModeType === 'isolated' ? 'Iso' : 'Cross'})`;
}

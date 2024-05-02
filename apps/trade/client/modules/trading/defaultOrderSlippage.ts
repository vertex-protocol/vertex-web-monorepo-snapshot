import { OrderSlippageSettings } from 'client/modules/localstorage/userSettings/types/tradingSettings';

export const DEFAULT_ORDER_SLIPPAGE: OrderSlippageSettings = {
  market: 0.01,
  stopMarket: 0.05,
  takeProfit: 0.01,
  stopLoss: 0.05,
};

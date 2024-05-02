import { OrderbookPriceTickSpacingMultiplier } from 'client/modules/trading/marketOrders/orderbook/types';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';

export type TradingConsolePosition = 'left' | 'right';

export type LeverageByProductId = Record<number, number>;

export type OrderbookTickSpacingMultiplierByProductId = Record<
  number,
  OrderbookPriceTickSpacingMultiplier
>;

export interface OrderSlippageSettings {
  market: number;
  stopMarket: number;
  takeProfit: number;
  stopLoss: number;
}

export type OrderSlippageType = keyof OrderSlippageSettings;

export interface SavedTradingUserSettings {
  consolePosition: TradingConsolePosition;
  leverageByProductId: LeverageByProductId;
  orderbookTickSpacingMultiplierByProductId: OrderbookTickSpacingMultiplierByProductId;
  showOrderbookTotalInQuote: boolean;
  spotLeverageEnabled: boolean;
  marketSlippageFraction: number | 'auto';
  slippage: OrderSlippageSettings;
  enableTradingNotifications: boolean;
  enableTradingOrderLines: boolean;
  tpSlTriggerPriceType: TriggerCriteriaPriceType;
}

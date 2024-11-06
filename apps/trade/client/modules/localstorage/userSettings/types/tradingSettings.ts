import {
  PositionsFilterOptionID,
  BalancesFilterOptionID,
  OpenOrdersFilterOptionID,
  HistoricalTradesFilterOptionID,
  RealizedPnlEventsFilterOptionID,
} from 'client/modules/trading/components/TradingTableTabs/types';
import { OrderbookPriceTickSpacingMultiplier } from 'client/modules/trading/marketOrders/orderbook/types';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';

export const TRADING_CONSOLE_POSITIONS = ['left', 'right'] as const;

export type TradingConsolePosition = (typeof TRADING_CONSOLE_POSITIONS)[number];

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

export interface SelectedFilterByTradingTableTab {
  positions: PositionsFilterOptionID;
  balances: BalancesFilterOptionID;
  openEngineOrders: OpenOrdersFilterOptionID;
  openTriggerOrders: OpenOrdersFilterOptionID;
  historicalTrades: HistoricalTradesFilterOptionID;
  realizedPnlEvents: RealizedPnlEventsFilterOptionID;
}

export interface SavedTradingUserSettings {
  consolePosition: TradingConsolePosition;
  leverageByProductId: LeverageByProductId;
  orderbookTickSpacingMultiplierByProductId: OrderbookTickSpacingMultiplierByProductId;
  showOrderbookTotalInQuote: boolean;
  spotLeverageEnabled: boolean;
  slippage: OrderSlippageSettings;
  enableTradingNotifications: boolean;
  enableTradingOrderLines: boolean;
  tpSlTriggerPriceType: TriggerCriteriaPriceType;
  selectedFilterByTradingTableTab: SelectedFilterByTradingTableTab;
}

import {
  BalancesFilterOptionID,
  HistoricalTradesFilterOptionID,
  OpenOrdersFilterOptionID,
  PositionsFilterOptionID,
  RealizedPnlEventsFilterOptionID,
} from 'client/modules/trading/components/TradingTableTabs/types';
import { OrderbookPriceTickSpacingMultiplier } from 'client/modules/trading/marketOrders/orderbook/types';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';

export const TRADING_CONSOLE_POSITIONS = ['left', 'right'] as const;

export type TradingConsolePosition = (typeof TRADING_CONSOLE_POSITIONS)[number];

// Legacy cross-margin leverage selection
export type LeverageByProductId = Record<number, number>;

// New margin modes that combines cross & isolated margin
export const MARGIN_MODES_TYPES = ['isolated', 'cross'] as const;

export type MarginModeType = (typeof MARGIN_MODES_TYPES)[number];

export interface IsoMarginMode {
  mode: 'isolated';
  leverage: number;
  enableBorrows: boolean;
}

export interface CrossMarginMode {
  mode: 'cross';
  leverage: number;
  enableBorrows?: never;
}

export type MarginMode = IsoMarginMode | CrossMarginMode;

export type MarginModeByProductId = Record<number, MarginMode>;

export interface MarginModeSettings {
  default: MarginModeType;
  lastSelected: MarginModeByProductId;
}

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
  marginMode: MarginModeSettings;
  orderbookTickSpacingMultiplierByProductId: OrderbookTickSpacingMultiplierByProductId;
  showOrderbookTotalInQuote: boolean;
  spotLeverageEnabled: boolean;
  slippage: OrderSlippageSettings;
  enableTradingNotifications: boolean;
  enableTradingOrderLines: boolean;
  tpSlTriggerPriceType: TriggerCriteriaPriceType;
  selectedFilterByTradingTableTab: SelectedFilterByTradingTableTab;
}

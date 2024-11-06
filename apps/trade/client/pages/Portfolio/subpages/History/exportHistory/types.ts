import { HistoricalLiquidatedBalanceType } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';
import { CsvDataItem } from 'client/utils/downloadCsv';

export type HistoryExportType =
  | 'deposits'
  | 'withdrawals'
  | 'transfers'
  | 'realized_pnl'
  | 'trades'
  | 'lp'
  | 'liquidations';

export interface GetExportHistoryDataParams {
  startTimeMillis: number;
  endTimeMillis: number;
  type: HistoryExportType;
}

export interface ExportHistoryCollateralItem extends CsvDataItem {
  time: string;
  // Symbol
  asset: string;
  balanceChange: string;
}

export interface ExportHistoryTradeItem extends CsvDataItem {
  time: string;
  marketName: string;
  orderType: string;
  avgPrice: string;
  amount: string;
  total: string;
  fee: string;
}

export interface ExportHistoryRealizedPnlItem extends CsvDataItem {
  time: string;
  marketName: string;
  // Position amount before the realized pnl event
  preEventBalanceAmount: string;
  entryPrice: string;
  exitPrice: string;
  filledAmountAbs: string;
  // In terms of primary quote
  pnl: string;
}

export interface ExportHistoryLpItem extends CsvDataItem {
  time: string;
  // For the wBTC-USDC pool, this would be wBTC
  baseAsset: string;
  lpAmountDelta: string;
  primaryQuoteAmountDelta: string;
  baseAssetAmountDelta: string;
}

export interface ExportHistoryLiquidationItem extends CsvDataItem {
  time: string;
  // For spot & LPs, this is the symbol. For perps, this is the market name
  productName: string;
  balanceType: HistoricalLiquidatedBalanceType;
  // Used as an "ID" to group liquidations
  submissionIndex: string;
  // For LPs, this is the number of LP tokens liquidated
  amountLiquidated: string;
  // Net change in the asset amount
  assetAmountDelta: string;
}

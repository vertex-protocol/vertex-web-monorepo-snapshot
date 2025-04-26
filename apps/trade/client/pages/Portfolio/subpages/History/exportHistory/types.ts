import { BigDecimal } from '@vertex-protocol/client';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { HistoricalLiquidatedBalanceType } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';
import { CsvDataItem } from 'client/utils/downloadCsv';

export type HistoryExportType =
  | 'deposits'
  | 'withdrawals'
  | 'transfers'
  | 'realized_pnl'
  | 'trades'
  | 'lp'
  | 'vlp'
  | 'liquidations'
  | 'funding'
  | 'interest';

export interface ExportHistoryDialogParams {
  initialExportType?: HistoryExportType;
}

export interface GetExportHistoryDataParams {
  startTimeMillis: number;
  endTimeMillis: number;
  type: HistoryExportType;
}

export interface ExportHistoryCollateralItem extends CsvDataItem {
  time: Date;
  // Symbol
  asset: string;
  balanceChange: BigDecimal;
  // Defined for subaccount transfers
  fromSubaccountName?: string;
  fromSubaccountUsername?: string;
  toSubaccountName?: string;
  toSubaccountUsername?: string;
}

export interface ExportHistoryTradeItem extends CsvDataItem {
  time: Date;
  marketName: string;
  orderType: string;
  marginModeType: MarginModeType;
  avgPrice: BigDecimal;
  amount: BigDecimal;
  total: BigDecimal;
  fee: BigDecimal;
}

export interface ExportHistoryRealizedPnlItem extends CsvDataItem {
  time: Date;
  marketName: string;
  marginModeType: MarginModeType;
  // Position amount before the realized pnl event
  preEventBalanceAmount: BigDecimal;
  entryPrice: BigDecimal;
  exitPrice: BigDecimal;
  filledAmountAbs: BigDecimal;
  // In terms of primary quote
  pnl: BigDecimal;
}

export interface ExportHistoryLpItem extends CsvDataItem {
  time: Date;
  // For the wBTC-USDC pool, this would be wBTC
  baseAsset: string;
  lpAmountDelta: BigDecimal;
  primaryQuoteAmountDelta: BigDecimal;
  baseAssetAmountDelta: BigDecimal;
}

export interface ExportHistoryVlpItem extends CsvDataItem {
  time: Date;
  vlpAmountDelta: BigDecimal;
  primaryQuoteAmountDelta: BigDecimal;
}

export interface ExportHistoryLiquidationItem extends CsvDataItem {
  time: Date;
  // For spot & LPs, this is the symbol. For perps, this is the market name
  productName: string;
  balanceType: HistoricalLiquidatedBalanceType;
  // Used as an "ID" to group liquidations
  submissionIndex: string;
  // For LPs, this is the number of LP tokens liquidated
  amountLiquidated: BigDecimal;
  // Net change in the asset amount
  assetAmountDelta: BigDecimal;
}

export interface ExportHistoryFundingItem extends CsvDataItem {
  time: Date;
  marketName: string;
  annualRateFrac: BigDecimal;
  fundingPaymentAmount: BigDecimal;
}

export interface ExportHistoryInterestItem extends CsvDataItem {
  time: Date;
  asset: string;
  annualRateFrac: BigDecimal;
  interestPaymentAmount: BigDecimal;
}

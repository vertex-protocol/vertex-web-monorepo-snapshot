import {
  ExportHistoryCollateralItem,
  ExportHistoryLiquidationItem,
  ExportHistoryLpItem,
  ExportHistoryRealizedPnlItem,
  ExportHistoryTradeItem,
  HistoryExportType,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';

export const EXPORT_HISTORY_QUERY_PAGE_SIZE = 100;

/*
 * CSV Headings
 * IMPORTANT: These must be declared in the order that the columns should appear in the CSV.
 * Ex: If the order of the columns should be time, asset, size, then the order of the keys in the object should be time, asset, size.
 */

type HeadingsForItem<TData> = Record<keyof TData, string>;

const COLLATERAL_HEADINGS: HeadingsForItem<ExportHistoryCollateralItem> = {
  time: 'Time',
  asset: 'Asset',
  balanceChange: 'Balance Change',
};

const LIQUIDATION_HEADINGS: HeadingsForItem<ExportHistoryLiquidationItem> = {
  time: 'Time',
  submissionIndex: 'Liquidation ID',
  balanceType: 'Type',
  productName: 'Product',
  amountLiquidated: 'Amount Liquidated',
  assetAmountDelta: 'Change in Asset',
};

const LP_HEADINGS: HeadingsForItem<ExportHistoryLpItem> = {
  time: 'Time',
  baseAsset: 'Asset',
  baseAssetAmountDelta: 'Change in Asset',
  lpAmountDelta: 'Change in LP Tokens',
  primaryQuoteAmountDelta: 'Change in Quote',
};

const TRADES_HEADINGS: HeadingsForItem<ExportHistoryTradeItem> = {
  time: 'Time',
  marketName: 'Market',
  orderType: 'Type',
  amount: 'Amount',
  avgPrice: 'Avg. Price',
  fee: 'Fee',
  total: 'Total',
};

const REALIZED_PNL_HEADINGS: HeadingsForItem<ExportHistoryRealizedPnlItem> = {
  time: 'Time',
  marketName: 'Market',
  preEventBalanceAmount: 'Pre-Fill Balance',
  filledAmountAbs: 'Size',
  entryPrice: 'Entry',
  exitPrice: 'Exit',
  pnl: 'PnL',
};

export const EXPORT_HISTORY_HEADINGS_BY_TYPE = {
  deposits: COLLATERAL_HEADINGS,
  withdrawals: COLLATERAL_HEADINGS,
  transfers: COLLATERAL_HEADINGS,
  lp: LP_HEADINGS,
  liquidations: LIQUIDATION_HEADINGS,
  realized_pnl: REALIZED_PNL_HEADINGS,
  trades: TRADES_HEADINGS,
} satisfies Record<HistoryExportType, Record<string, string>>;
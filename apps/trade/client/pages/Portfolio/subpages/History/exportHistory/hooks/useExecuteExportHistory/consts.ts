import {
  ExportHistoryCollateralItem,
  ExportHistoryFundingItem,
  ExportHistoryInterestItem,
  ExportHistoryLiquidationItem,
  ExportHistoryLpItem,
  ExportHistoryRealizedPnlItem,
  ExportHistoryTradeItem,
  ExportHistoryVlpItem,
  HistoryExportType,
} from 'client/pages/Portfolio/subpages/History/exportHistory/types';

export const EXPORT_HISTORY_QUERY_PAGE_SIZE = 100;

export const EXPORT_HISTORY_QUERY_DELAY_MILLIS = 100;

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

const TRANSFER_HEADINGS: HeadingsForItem<ExportHistoryCollateralItem> = {
  ...COLLATERAL_HEADINGS,
  fromSubaccountName: 'From',
  toSubaccountName: 'To',
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

const VLP_HEADINGS: HeadingsForItem<ExportHistoryVlpItem> = {
  time: 'Time',
  vlpAmountDelta: 'Change in VLP Tokens',
  primaryQuoteAmountDelta: 'Change in Quote',
};

const TRADES_HEADINGS: HeadingsForItem<ExportHistoryTradeItem> = {
  time: 'Time',
  marketName: 'Market',
  orderType: 'Type',
  marginModeType: 'Margin Type',
  amount: 'Amount',
  avgPrice: 'Avg. Price',
  fee: 'Fee',
  total: 'Total',
};

const REALIZED_PNL_HEADINGS: HeadingsForItem<ExportHistoryRealizedPnlItem> = {
  time: 'Time',
  marketName: 'Market',
  marginModeType: 'Margin Type',
  preEventBalanceAmount: 'Pre-Fill Balance',
  filledAmountAbs: 'Size',
  entryPrice: 'Entry',
  exitPrice: 'Exit',
  pnl: 'PnL',
};

const FUNDING_HEADINGS: HeadingsForItem<ExportHistoryFundingItem> = {
  time: 'Time',
  marketName: 'Market',
  annualRateFrac: 'Annualized Funding Rate',
  fundingPaymentAmount: 'Funding Payment Amount',
};

const INTEREST_HEADINGS: HeadingsForItem<ExportHistoryInterestItem> = {
  time: 'Time',
  asset: 'Asset',
  annualRateFrac: 'Annualized Interest Rate',
  interestPaymentAmount: 'Interest Payment Amount',
};

export const EXPORT_HISTORY_HEADINGS_BY_TYPE = {
  deposits: COLLATERAL_HEADINGS,
  withdrawals: COLLATERAL_HEADINGS,
  transfers: TRANSFER_HEADINGS,
  lp: LP_HEADINGS,
  vlp: VLP_HEADINGS,
  liquidations: LIQUIDATION_HEADINGS,
  realized_pnl: REALIZED_PNL_HEADINGS,
  trades: TRADES_HEADINGS,
  funding: FUNDING_HEADINGS,
  interest: INTEREST_HEADINGS,
} satisfies Record<HistoryExportType, Record<string, string>>;

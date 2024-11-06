import { NumberFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { OrderType } from 'client/modules/trading/types';

export interface HistoricalTradesTableItem {
  marketInfo: MarketInfoCellData;
  orderType: OrderType;
  timestampMillis: number;
  tradeFeeQuote: BigDecimal;
  filledPrice: BigDecimal;
  filledAmount: BigDecimal;
  filledAmountAbs: BigDecimal;
  tradeTotalCost: BigDecimal;
  marketPriceFormatSpecifier: NumberFormatSpecifier | string;
  marketSizeFormatSpecifier: NumberFormatSpecifier | string;
  quoteSizeFormatSpecifier: NumberFormatSpecifier | string;
}

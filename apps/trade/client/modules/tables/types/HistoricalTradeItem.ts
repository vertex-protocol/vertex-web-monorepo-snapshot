import { BigDecimal } from '@vertex-protocol/utils';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { OrderType } from 'client/modules/trading/types';

export interface HistoricalTradeItem {
  marketInfo: MarketInfoCellData;
  orderType: OrderType;
  timestampMillis: number;
  tradeFee: BigDecimal;
  sequencerFee: BigDecimal;
  filledPrice: BigDecimal;
  filledAmount: BigDecimal;
  filledAmountAbs: BigDecimal;
  tradeTotalCost: BigDecimal;
}

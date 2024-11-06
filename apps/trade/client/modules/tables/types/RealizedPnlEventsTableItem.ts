import { BigDecimal } from '@vertex-protocol/client';
import { NumberFormatSpecifier } from '@vertex-protocol/react-client';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';

export interface RealizedPnlEventsTableItem {
  productId: number;
  timestampMillis: number;
  marketInfo: MarketInfoCellData;
  pnlInfo: {
    realizedPnlUsd: BigDecimal;
    realizedPnlFrac: BigDecimal;
  };
  filledAmountAbs: BigDecimal;
  entryPrice: BigDecimal;
  exitPrice: BigDecimal;
  marketPriceFormatSpecifier: NumberFormatSpecifier | string;
  marketSizeFormatSpecifier: NumberFormatSpecifier | string;
}

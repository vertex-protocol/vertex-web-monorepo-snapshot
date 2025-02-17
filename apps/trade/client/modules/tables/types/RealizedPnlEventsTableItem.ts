import { BigDecimal } from '@vertex-protocol/client';
import { NumberFormatSpecifier } from '@vertex-protocol/react-client';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';

export interface RealizedPnlEventsTableItem {
  productId: number;
  timestampMillis: number;
  marketInfo: MarketInfoCellData;
  pnlInfo: {
    realizedPnlUsd: BigDecimal;
    realizedPnlFrac: BigDecimal;
  };
  marginModeType: MarginModeType;
  filledAmountAbs: BigDecimal;
  entryPrice: BigDecimal;
  exitPrice: BigDecimal;
  marketPriceFormatSpecifier: NumberFormatSpecifier | string;
  marketSizeFormatSpecifier: NumberFormatSpecifier | string;
}

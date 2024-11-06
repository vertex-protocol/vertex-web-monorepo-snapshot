import { BigDecimal } from '@vertex-protocol/client';
import { TradingSidebarMarketItem } from 'client/modules/trading/tradingSidebar/types';

export interface TradingSidebarMarketData extends TradingSidebarMarketItem {
  pastDayVolumeInPrimaryQuote: BigDecimal | undefined;
  currentPrice: BigDecimal | undefined;
  pastDayPriceChangeFrac: BigDecimal | undefined;
  priceIncrement: BigDecimal | undefined;
}

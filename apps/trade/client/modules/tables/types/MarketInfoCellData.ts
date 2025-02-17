import { ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { TokenIconMetadata } from '@vertex-protocol/react-client';

export interface MarketInfoCellData {
  marketName: string;
  icon: TokenIconMetadata;
  symbol: string;
  quoteSymbol: string;
  isPrimaryQuote: boolean;
  amountForSide: BigDecimal;
  productType: ProductEngineType;
  sizeIncrement: BigDecimal;
  priceIncrement: BigDecimal;
}

import { BigDecimal } from '@vertex-protocol/utils';
import { safeDiv } from 'client/utils/safeDiv';

/**
 * Oracle prices are in terms of primary quote, but we often want to convert the price to be denominated in terms of the quote for the market.
 * The implied conversion price is (base oracle price / quote oracle price)
 *
 * @param marketProductOraclePrice - The oracle price of the product
 * @param quoteOraclePrice - The oracle price of the quote product for the market
 */
export function calcMarketConversionPriceFromOraclePrice(
  marketProductOraclePrice: BigDecimal,
  quoteOraclePrice: BigDecimal,
) {
  return safeDiv(marketProductOraclePrice, quoteOraclePrice);
}

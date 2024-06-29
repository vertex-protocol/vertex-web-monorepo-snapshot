import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useMarket } from 'client/hooks/markets/useMarket';
import {
  useMaxOrderSize,
  UseMaxOrderSizeParams,
} from 'client/hooks/query/subaccount/useMaxOrderSize';
import { QueryState } from 'client/types/QueryState';
import { calcMarketConversionPriceFromOraclePrice } from 'client/utils/calcs/calcMarketConversionPriceFromOraclePrice';
import { roundToPrecision } from 'client/utils/rounding';
import { useMemo } from 'react';

/**
 * A wrapper hook around the max order size query that applies:
 * - Rounding of query price to ensure we don't hit backend too often
 * - Checking against market oracle price to ensure that the price submitted is within valid bounds (20% -> 500% of oracle price)
 * - Decimal adjustment of the returned max order size
 */
export function useMaxOrderSizeEstimation(
  params: UseMaxOrderSizeParams | undefined,
): QueryState<BigDecimal> {
  const { data: marketData } = useMarket({ productId: params?.productId });
  const { data: quoteData } = useMarket({
    productId: marketData?.metadata.quoteProductId,
  });

  const roundedPriceForQuery = useMemo(() => {
    if (!params) {
      return;
    }

    return roundToPrecision(
      params.price,
      4,
      params.side === 'long' ? BigDecimal.ROUND_UP : BigDecimal.ROUND_DOWN,
    );
  }, [params]);

  const maxOrderSizeParams = useMemo<UseMaxOrderSizeParams | undefined>(() => {
    if (!roundedPriceForQuery || !params) {
      return;
    }

    const baseOraclePrice = marketData?.product.oraclePrice;
    const quoteOraclePrice = quoteData?.product.oraclePrice;

    // Backend errors on prices that are out of the 20% -> 500% range from the current ORACLE price, so skip the query if the price is outside of this range
    if (baseOraclePrice && quoteOraclePrice) {
      const impliedMarketOraclePrice = calcMarketConversionPriceFromOraclePrice(
        baseOraclePrice,
        quoteOraclePrice,
      );
      const isInvalidPrice =
        impliedMarketOraclePrice.multipliedBy(5).lt(roundedPriceForQuery) ||
        impliedMarketOraclePrice.multipliedBy(0.2).gt(roundedPriceForQuery);

      // Perform the check only if we have a valid market oracle price
      if (impliedMarketOraclePrice.gt(0) && isInvalidPrice) {
        return;
      }
    }

    return {
      ...params,
      price: roundedPriceForQuery,
    };
  }, [
    roundedPriceForQuery,
    params,
    marketData?.product.oraclePrice,
    quoteData?.product.oraclePrice,
  ]);

  const { data, ...rest } = useMaxOrderSize(maxOrderSizeParams);

  const mappedData = useMemo(() => {
    return removeDecimals(data);
  }, [data]);

  return {
    data: mappedData,
    ...rest,
  };
}

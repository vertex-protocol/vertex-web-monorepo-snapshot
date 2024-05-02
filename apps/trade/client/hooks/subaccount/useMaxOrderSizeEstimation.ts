import {
  useMaxOrderSize,
  UseMaxOrderSizeParams,
} from 'client/hooks/query/subaccount/useMaxOrderSize';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useMemo } from 'react';
import { roundToPrecision } from 'client/utils/rounding';
import { BigDecimal } from '@vertex-protocol/utils';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { QueryState } from 'client/types/QueryState';

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

  const oraclePrice = marketData?.product.oraclePrice;

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
    // Backend errors on prices that are out of the 20% -> 500% range from the current ORACLE price, so skip the query if the price is outside of this range
    if (oraclePrice) {
      if (
        oraclePrice.multipliedBy(5).lt(roundedPriceForQuery) ||
        oraclePrice.multipliedBy(0.2).gt(roundedPriceForQuery)
      ) {
        return;
      }
    }

    return {
      ...params,
      price: roundedPriceForQuery,
    };
  }, [roundedPriceForQuery, params, oraclePrice]);

  const { data, ...rest } = useMaxOrderSize(maxOrderSizeParams);

  const mappedData = useMemo(() => {
    return removeDecimals(data);
  }, [data]);

  return {
    data: mappedData,
    ...rest,
  };
}

import { BigDecimals } from '@vertex-protocol/client';
import { useQueryPrimaryQuotePrice } from 'client/hooks/query/useQueryPrimaryQuotePrice';
import { useMemo } from 'react';

/**
 * Returns the current price, in $USD, of the primary quote currency. This is needed as we cannot guarantee that 1 USDC == $1
 *
 * @returns The current price of the primary quote currency in $USD, or 1 if the price is not available
 */
export function usePrimaryQuotePriceUsd() {
  const { data } = useQueryPrimaryQuotePrice();

  return useMemo(() => {
    if (!data) {
      return BigDecimals.ONE;
    }
    return data.price;
  }, [data]);
}

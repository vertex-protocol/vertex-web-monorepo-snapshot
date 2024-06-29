import { BigDecimals } from '@vertex-protocol/utils';
import { useIndexerPrimaryQuotePrice } from 'client/hooks/query/markets/useIndexerPrimaryQuotePrice';
import { useMemo } from 'react';

/**
 * Returns the current price, in $USD, of the primary quote currency. This is needed as we cannot guarantee that 1 USDC == $1
 *
 * @returns The current price of the primary quote currency in $USD, or 1 if the price is not available
 */
export function usePrimaryQuotePriceUsd() {
  const { data } = useIndexerPrimaryQuotePrice();
  return useMemo(() => {
    if (!data) {
      return BigDecimals.ONE;
    }
    return data.price;
  }, [data]);
}

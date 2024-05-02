import { useMemo } from 'react';
import { useIndexerQuotePrice } from 'client/hooks/query/markets/useIndexerQuotePrice';
import { BigDecimals } from 'client/utils/BigDecimals';

// Defaults to 1 in case of error
export function useQuotePriceUsd() {
  const { data } = useIndexerQuotePrice();
  return useMemo(() => {
    if (!data) {
      return BigDecimals.ONE;
    }
    return data.price;
  }, [data]);
}

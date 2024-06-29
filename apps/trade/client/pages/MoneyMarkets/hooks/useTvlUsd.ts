import { removeDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllMarkets24hrSnapshots } from 'client/hooks/markets/useAllMarkets24hrSnapshots';

/*
 * Hook to get the total value locked on a given network using the latest market snapshot
 * We want to show this value in terms of USD
 */
export function useTvlUsd() {
  const quotePrice = usePrimaryQuotePriceUsd();
  const { data: marketSnapshots } = useAllMarkets24hrSnapshots();

  return useMemo(
    () => removeDecimals(marketSnapshots?.latest?.tvl.multipliedBy(quotePrice)),
    [marketSnapshots?.latest?.tvl, quotePrice],
  );
}

import { QueryState } from 'client/types/QueryState';

import { LatestMarketPrice } from 'client/hooks/query/markets/types';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';

interface Params {
  productId?: number;
}

export function useLatestMarketPrice({
  productId,
}: Params): QueryState<LatestMarketPrice> {
  const { data, ...rest } = useAllMarketsLatestPrices();

  return {
    data: productId ? data?.[productId] : undefined,
    ...rest,
  };
}

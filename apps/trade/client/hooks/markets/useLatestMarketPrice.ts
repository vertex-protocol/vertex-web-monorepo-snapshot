import {
  LatestMarketPrice,
  useAllMarketsLatestPrices,
} from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { QueryState } from 'client/types/QueryState';

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

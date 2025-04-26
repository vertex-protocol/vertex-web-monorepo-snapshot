import { AnnotatedMarket } from '@vertex-protocol/react-client';
import { getMarketForProductId } from 'client/hooks/query/markets/allMarkets/getMarketForProductId';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useMemo } from 'react';

interface Params {
  productId: number | undefined;
}

export function useMarket<TMarket extends AnnotatedMarket = AnnotatedMarket>({
  productId,
}: Params) {
  const { data, ...rest } = useAllMarkets();

  const marketData = useMemo((): TMarket | undefined => {
    if (productId === undefined || !data) {
      return;
    }

    return getMarketForProductId<TMarket>(productId, data);
  }, [data, productId]);

  return {
    ...rest,
    data: marketData,
  };
}

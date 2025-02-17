import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { AnnotatedMarket } from '@vertex-protocol/react-client';
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

    if (productId === QUOTE_PRODUCT_ID) {
      return data.primaryQuoteProduct as TMarket;
    }
    const spotMarket = data.spotMarkets[productId];
    if (spotMarket) {
      return spotMarket as TMarket;
    }
    const perpMarket = data.perpMarkets[productId];
    if (perpMarket) {
      return perpMarket as TMarket;
    }
  }, [data, productId]);

  return {
    ...rest,
    data: marketData,
  };
}

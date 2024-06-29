import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  AllMarketsSelectFn,
  useAllMarkets,
} from 'client/hooks/query/markets/useAllMarkets';
import { AnnotatedMarket } from 'common/productMetadata/types';
import { useCallback } from 'react';

interface Params {
  productId?: number;
}

export function useMarket<TMarket extends AnnotatedMarket = AnnotatedMarket>({
  productId,
}: Params) {
  const select = useCallback<AllMarketsSelectFn<TMarket | undefined>>(
    (data): TMarket | undefined => {
      if (productId == null) {
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
    },
    [productId],
  );

  return useAllMarkets({ select });
}

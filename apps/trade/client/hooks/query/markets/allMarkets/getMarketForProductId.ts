import { QUOTE_PRODUCT_ID, VLP_PRODUCT_ID } from '@vertex-protocol/client';
import { AnnotatedMarket } from '@vertex-protocol/react-client';
import { AllMarketsForChainEnv } from 'client/hooks/query/markets/allMarkets/types';

export function getMarketForProductId<
  T extends AnnotatedMarket = AnnotatedMarket,
>(
  productId: number,
  dataForChainEnv: AllMarketsForChainEnv | undefined,
): T | undefined {
  if (!dataForChainEnv) {
    return;
  }

  if (productId === QUOTE_PRODUCT_ID) {
    return dataForChainEnv.primaryQuoteProduct as T;
  }
  if (productId === VLP_PRODUCT_ID) {
    return dataForChainEnv.vlpProduct as T;
  }

  return dataForChainEnv.allMarkets[productId] as T;
}

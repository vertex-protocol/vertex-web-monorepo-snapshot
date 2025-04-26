import { QUOTE_PRODUCT_ID, VLP_PRODUCT_ID } from '@vertex-protocol/client';
import {
  AllMarketsStaticDataForChainEnv,
  StaticMarketData,
} from 'client/hooks/markets/marketsStaticData/types';

export function getStaticMarketDataForProductId<T extends StaticMarketData>(
  productId: number,
  dataForChainEnv: AllMarketsStaticDataForChainEnv | undefined,
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

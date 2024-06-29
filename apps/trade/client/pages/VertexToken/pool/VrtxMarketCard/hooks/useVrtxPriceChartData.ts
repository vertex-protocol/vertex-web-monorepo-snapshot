import { useQuery } from '@tanstack/react-query';
import { CandlestickPeriod } from '@vertex-protocol/indexer-client';
import {
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { secondsToMilliseconds } from 'date-fns';

export interface VrtxPriceChartDataItem {
  timestampMillis: number;
  price: number;
}

export function useVrtxPriceChartData() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: ['vrtxPriceChart'],
    queryFn: async (): Promise<VrtxPriceChartDataItem[]> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const baseResponse = await vertexClient.market.getCandlesticks({
        productId: protocolTokenMetadata.productId,
        // 24 hr
        period: CandlestickPeriod.HOUR,
        limit: 24,
      });

      return baseResponse.map((candlestick): VrtxPriceChartDataItem => {
        return {
          timestampMillis: secondsToMilliseconds(candlestick.time.toNumber()),
          price: candlestick.close.toNumber(),
        };
      });
    },
    enabled: !disabled,
  });
}

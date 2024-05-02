import { useQuery } from '@tanstack/react-query';
import { useVertexClient } from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { CandlestickPeriod } from '@vertex-protocol/indexer-client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { secondsToMilliseconds } from 'date-fns';

export interface VrtxPriceChartDataItem {
  timestampMillis: number;
  price: number;
}

export function useVrtxPriceChartData() {
  const { protocolTokenProductId } = useVertexMetadataContext();
  const vertexClient = useVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: ['vrtxPriceChart'],
    queryFn: async (): Promise<VrtxPriceChartDataItem[]> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const baseResponse = await vertexClient.market.getCandlesticks({
        productId: protocolTokenProductId,
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

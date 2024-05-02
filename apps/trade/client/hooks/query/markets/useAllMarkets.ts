import { useQuery } from '@tanstack/react-query';
import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  PrimaryChainID,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import {
  AnnotatedMarket,
  AnnotatedPerpMarket,
  AnnotatedSpotMarket,
} from 'common/productMetadata/types';

export type AllMarketsSelectFn<TSelectedData> = (
  data: AllMarketsData,
) => TSelectedData;

interface AllMarketsParams<TSelectedData> {
  select?: AllMarketsSelectFn<TSelectedData>;
}

export interface AllMarketsData {
  // All markets trade against quote, this is a market for typing purposes but only the product is relevant
  quoteProduct: AnnotatedSpotMarket;
  // Registered markets from product id -> data
  allMarkets: Record<number, AnnotatedMarket>;
  spotMarkets: Record<number, AnnotatedSpotMarket>;
  perpMarkets: Record<number, AnnotatedPerpMarket>;
  allMarketsProductIds: number[];
  spotMarketsProductIds: number[];
  perpMarketsProductIds: number[];
}

export function allMarketsQueryKey(chainId?: PrimaryChainID) {
  return ['allMarkets', chainId];
}

export function useAllMarkets<TSelectedData = AllMarketsData>(
  params?: AllMarketsParams<TSelectedData>,
) {
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'allMarkets',
    true,
  );
  const vertexClient = useVertexClient();
  const { getPerpMetadata, getSpotMetadata } = useVertexMetadataContext();
  const primaryChainId = usePrimaryChainId();

  const disabled = !vertexClient;

  const queryFn = async (): Promise<AllMarketsData> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    startProfiling();
    const baseResponse = await vertexClient.market.getAllEngineMarkets();
    endProfiling();

    // Construct money-markets from base data
    let quoteProduct: AnnotatedSpotMarket | undefined = undefined;
    const spotMarkets: Record<number, AnnotatedSpotMarket> = {};
    const perpMarkets: Record<number, AnnotatedPerpMarket> = {};

    baseResponse.forEach((market) => {
      if (market.type === ProductEngineType.SPOT) {
        const metadata = getSpotMetadata(market.product.productId);
        if (!metadata) {
          return;
        }

        const annotatedSpotMarket = { ...market, metadata };

        if (market.productId === QUOTE_PRODUCT_ID) {
          quoteProduct = annotatedSpotMarket;
        } else {
          spotMarkets[market.productId] = annotatedSpotMarket;
        }
      } else if (market.type === ProductEngineType.PERP) {
        const metadata = getPerpMetadata(market.product.productId);
        if (!metadata) {
          return;
        }

        // For example, if initial weight is 0.9, then max leverage is 1 / 0.1 = 10x
        const maxLeverage = Math.round(
          1 / (1 - market.product.longWeightInitial.toNumber()),
        );

        perpMarkets[market.productId] = {
          ...market,
          metadata,
          maxLeverage,
        };
      }
    });

    if (quoteProduct == null) {
      throw Error('Quote product not found');
    }

    const spotMarketsProductIds = Object.keys(spotMarkets).map(Number);
    const perpMarketsProductIds = Object.keys(perpMarkets).map(Number);

    return {
      quoteProduct,
      spotMarkets,
      perpMarkets,
      allMarkets: { ...spotMarkets, ...perpMarkets },
      allMarketsProductIds: [
        ...spotMarketsProductIds,
        ...perpMarketsProductIds,
      ],
      spotMarketsProductIds,
      perpMarketsProductIds,
    };
  };

  return useQuery({
    queryKey: allMarketsQueryKey(primaryChainId),
    queryFn,
    enabled: !disabled,
    refetchInterval: 60000,
    select: params?.select,
  });
}

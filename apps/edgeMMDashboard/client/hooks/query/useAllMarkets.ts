import { useQuery } from '@tanstack/react-query';
import { VLP_PRODUCT_ID } from '@vertex-protocol/client';
import {
  ChainEnv,
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  AnnotatedMarket,
  AnnotatedPerpMarket,
  AnnotatedSpotMarket,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';

export type AllMarketsSelectFn<TSelectedData> = (
  data: AllMarketsData,
) => TSelectedData;

interface AllMarketsParams<TSelectedData> {
  select?: AllMarketsSelectFn<TSelectedData>;
}

export interface AllMarketsData {
  /**
   * This is a market for typing purposes but only the product is relevant
   */
  primaryQuoteProduct: AnnotatedSpotMarket;
  /**
   * This is also a market for typing purposes only, but only the product is relevant because VLP does not have a spot market
   */
  vlpProduct: AnnotatedSpotMarket | undefined;
  /**
   * Registered markets from product id -> data
   */
  allMarkets: Record<number, AnnotatedMarket>;
  spotMarkets: Record<number, AnnotatedSpotMarket>;
  perpMarkets: Record<number, AnnotatedPerpMarket>;
  allMarketsProductIds: number[];
  spotMarketsProductIds: number[];
  perpMarketsProductIds: number[];
}

export function allMarketsQueryKey(chainEnv?: ChainEnv) {
  return ['allMarkets', chainEnv];
}

export function useAllMarkets<TSelectedData = AllMarketsData>(
  params?: AllMarketsParams<TSelectedData>,
) {
  const vertexClient = usePrimaryChainVertexClient();
  const { getPerpMetadata, getSpotMetadata } = useVertexMetadataContext();
  const { primaryChainEnv } = useEVMContext();

  const disabled = !vertexClient;

  const queryFn = async (): Promise<AllMarketsData> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const baseResponse = await vertexClient.market.getAllEngineMarkets();

    let primaryQuoteProduct: AnnotatedSpotMarket | undefined;
    let vlpProduct: AnnotatedSpotMarket | undefined;
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
          primaryQuoteProduct = annotatedSpotMarket;
        } else if (market.productId === VLP_PRODUCT_ID) {
          vlpProduct = annotatedSpotMarket;
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

    if (primaryQuoteProduct == null) {
      throw new Error('Quote product not found');
    }

    const spotMarketsProductIds = Object.keys(spotMarkets).map(Number);
    const perpMarketsProductIds = Object.keys(perpMarkets).map(Number);

    return {
      primaryQuoteProduct,
      vlpProduct,
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
    queryKey: allMarketsQueryKey(primaryChainEnv),
    queryFn,
    enabled: !disabled,
    refetchInterval: 60000,
    select: params?.select,
  });
}

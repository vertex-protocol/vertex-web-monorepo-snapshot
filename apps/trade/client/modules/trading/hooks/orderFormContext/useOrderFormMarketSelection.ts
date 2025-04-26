import { ProductEngineType } from '@vertex-protocol/client';
import {
  PerpStaticMarketData,
  SpotStaticMarketData,
  StaticMarketQuoteData,
} from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { first } from 'lodash';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseOrderFormMarketSelection<TMarketType extends ProductEngineType> {
  /**
   * Currently selected market
   */
  currentMarket: StaticDataByProductType[TMarketType] | undefined;
  /**
   * Quote metadata for the current market
   */
  quoteMetadata: StaticMarketQuoteData | undefined;
}

interface StaticDataByProductType {
  [ProductEngineType.SPOT]: SpotStaticMarketData;
  [ProductEngineType.PERP]: PerpStaticMarketData;
}

/**
 * Contains the logic for the selected market in the order form. Also handles syncing the selected market with the current route
 */
export function useOrderFormMarketSelection<
  TMarketType extends ProductEngineType,
>(marketType: TMarketType): UseOrderFormMarketSelection<TMarketType> {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const [currentMarketId, setCurrentMarketId] = useState<number>();

  const pushTradePage = usePushTradePage();
  const sanitizedSearchParamsMarketName = useMarketNameFromSearchParams();

  const availableMarketsByProductId = (
    marketType === ProductEngineType.SPOT
      ? allMarketsStaticData?.spotMarkets
      : allMarketsStaticData?.perpMarkets
  ) as Record<number, StaticDataByProductType[TMarketType]> | undefined;

  const availableMarkets = availableMarketsByProductId
    ? Object.values(availableMarketsByProductId)
    : undefined;

  const setCurrentMarket = useCallback(
    (productId: number) => {
      if (
        // Safeguard against incorrect product IDs
        availableMarketsByProductId?.[productId]
      ) {
        setCurrentMarketId(productId);
      }
    },
    [availableMarketsByProductId],
  );

  const currentMarket = currentMarketId
    ? availableMarketsByProductId?.[currentMarketId]
    : undefined;
  const quoteMetadata = currentMarketId
    ? allMarketsStaticData?.quotes?.[currentMarketId]
    : undefined;

  const searchParamsProductId = useMemo(() => {
    return availableMarkets?.find(
      (mkt) =>
        mkt.metadata.marketName.toLowerCase() ===
        sanitizedSearchParamsMarketName?.toLowerCase(),
    )?.productId;
  }, [availableMarkets, sanitizedSearchParamsMarketName]);

  useEffect(() => {
    // If we have a search params product ID and it's different from the current market, set the current market using the search params as source of truth
    if (
      searchParamsProductId &&
      currentMarket?.productId !== searchParamsProductId
    ) {
      setCurrentMarket(searchParamsProductId);
      return;
    }
    // If there isn't a valid current market and we have market data, default to the first available market
    // We need to use pushTradePage here because we want the URL to update to reflect the selected market
    // This is important in chain switching, let's say you are on `spot?market=wBTC-USDC`, then switch chain to Mantle, where this market doesn't exist
    // Then, it is insufficient to just update the selected market, we also need to update the URL to reflect the new market
    if (!currentMarket && availableMarkets) {
      const firstMarket = first(availableMarkets);
      if (firstMarket) {
        pushTradePage({
          productId: firstMarket.productId,
        });
      }
      return;
    }
  }, [
    availableMarkets,
    currentMarket,
    currentMarketId,
    pushTradePage,
    searchParamsProductId,
    setCurrentMarket,
  ]);

  return {
    currentMarket,
    quoteMetadata,
  };
}

function useMarketNameFromSearchParams() {
  const searchParams = useSearchParams();
  const marketName = searchParams.get('market');

  return marketName?.toLowerCase();
}

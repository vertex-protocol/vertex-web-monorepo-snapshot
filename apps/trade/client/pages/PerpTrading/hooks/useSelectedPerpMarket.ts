import {
  PerpStaticMarketData,
  useAllMarketsStaticData,
} from 'client/hooks/markets/useAllMarketsStaticData';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { first } from 'lodash';

interface UseSelectedPerpMarket {
  currentMarket?: PerpStaticMarketData;
  setCurrentMarket: (productId: number) => void;
}

const perpMarketIdAtom = atom<number | undefined>(undefined);

export function useSelectedPerpMarket(): UseSelectedPerpMarket {
  const [currentMarketId, setCurrentMarketId] = useAtom(perpMarketIdAtom);
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const perpMarketDataByProductId = allMarketsStaticData?.perp;

  const setCurrentMarket = useCallback(
    (productId: number) => {
      if (
        // Safeguard against incorrect product IDs
        perpMarketDataByProductId?.[productId]
      ) {
        setCurrentMarketId(productId);
      }
    },
    [perpMarketDataByProductId, setCurrentMarketId],
  );

  // Populate current market when data is fetched
  useEffect(
    () => {
      const firstPerpMarket = first(
        Object.values(perpMarketDataByProductId ?? {}),
      );
      if (firstPerpMarket && !currentMarketId) {
        setCurrentMarket(firstPerpMarket.productId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [perpMarketDataByProductId],
  );

  const currentMarket = currentMarketId
    ? perpMarketDataByProductId?.[currentMarketId]
    : undefined;

  return useMemo((): UseSelectedPerpMarket => {
    return {
      currentMarket,
      setCurrentMarket,
    };
  }, [currentMarket, setCurrentMarket]);
}

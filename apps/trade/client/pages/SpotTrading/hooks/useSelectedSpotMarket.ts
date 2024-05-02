import {
  SpotStaticMarketData,
  useAllMarketsStaticData,
} from 'client/hooks/markets/useAllMarketsStaticData';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect, useMemo } from 'react';
import { first } from 'lodash';

type UseSelectedSpotMarket = {
  currentMarket?: SpotStaticMarketData;
  setCurrentMarket: (productId: number) => void;
};

const spotMarketIdAtom = atom<number | undefined>(undefined);

export function useSelectedSpotMarket(): UseSelectedSpotMarket {
  const [currentMarketId, setCurrentMarketId] = useAtom(spotMarketIdAtom);
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const spotMarketDataByProductId = allMarketsStaticData?.spot;

  const setCurrentMarket = useCallback(
    (productId: number) => {
      if (
        // Safeguard against incorrect product IDs
        spotMarketDataByProductId?.[productId]
      ) {
        setCurrentMarketId(productId);
      }
    },
    [spotMarketDataByProductId, setCurrentMarketId],
  );

  // Populate current market when data is fetched
  useEffect(
    () => {
      const firstSpotMarket = first(
        Object.values(spotMarketDataByProductId ?? {}),
      );
      if (firstSpotMarket && !currentMarketId) {
        setCurrentMarket(firstSpotMarket.productId);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spotMarketDataByProductId],
  );

  const currentMarket = currentMarketId
    ? spotMarketDataByProductId?.[currentMarketId]
    : undefined;

  const data = useMemo((): UseSelectedSpotMarket => {
    return {
      currentMarket,
      setCurrentMarket,
    };
  }, [currentMarket, setCurrentMarket]);

  return data;
}

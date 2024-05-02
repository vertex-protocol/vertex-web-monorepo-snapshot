import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { first } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

interface Params {
  currentMarket?: StaticMarketData;
  setCurrentMarket: (productId: number) => void;
  // Either spot or perp markets
  relevantMarketsByProductId?: Record<number, StaticMarketData>;
}

export function useTradingPageRouteSync({
  currentMarket,
  setCurrentMarket,
  relevantMarketsByProductId,
}: Params) {
  const sanitizedRouteMarketName = useMarketNameFromRoute();

  const currentMarketProductId = currentMarket?.productId;
  const routeProductId = useMemo(() => {
    return Object.values(relevantMarketsByProductId ?? {}).find(
      (mkt) =>
        mkt.metadata.marketName.toLowerCase() ===
        sanitizedRouteMarketName?.toLowerCase(),
    )?.productId;
  }, [relevantMarketsByProductId, sanitizedRouteMarketName]);

  useEffect(() => {
    if (routeProductId && currentMarketProductId !== routeProductId) {
      setCurrentMarket(routeProductId);
    }
  }, [currentMarketProductId, routeProductId, setCurrentMarket]);
}

function useMarketNameFromRoute() {
  const {
    query: { marketName },
  } = useRouter();
  return first(marketName)?.toLowerCase();
}

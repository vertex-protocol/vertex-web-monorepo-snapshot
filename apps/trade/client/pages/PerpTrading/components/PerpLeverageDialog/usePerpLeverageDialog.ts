import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useMemo, useState } from 'react';

export function usePerpLeverageDialog({
  initialLeverage,
  productId,
}: {
  initialLeverage: number;
  productId: number;
}) {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const currentMarket = allMarketsStaticData?.perp[productId];

  const maxLeverage = currentMarket?.maxLeverage ?? 1;

  const [leverage, setLeverage] = useState<number>(initialLeverage);

  return useMemo(() => {
    return {
      currentMarket,
      leverage,
      maxLeverage,
      setLeverage,
    };
  }, [currentMarket, leverage, maxLeverage, setLeverage]);
}

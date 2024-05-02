import { useSelectedPerpMarket } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarket';
import { useMemo, useState } from 'react';

export function usePerpLeverage({
  initialLeverage,
}: {
  initialLeverage: number;
}) {
  const { currentMarket } = useSelectedPerpMarket();
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

import { useAtom } from 'jotai';
import { spotPriceInputAtom } from 'client/store/trading/spotTradingStore';
import { perpPriceInputAtom } from 'client/store/trading/perpTradingStore';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useCallback } from 'react';
import { BigDecimal } from '@vertex-protocol/utils';
import { ProductEngineType } from '@vertex-protocol/contracts';

export function useSetPriceInput() {
  const [, setSpotPriceInput] = useAtom(spotPriceInputAtom);
  const [, setPerpPriceInput] = useAtom(perpPriceInputAtom);

  const { data: marketStaticData } = useAllMarketsStaticData();

  return useCallback(
    (productId: number, price: BigDecimal) => {
      const marketData = marketStaticData?.all?.[productId];

      if (marketData?.type === ProductEngineType.PERP) {
        setPerpPriceInput(price);
      }
      if (marketData?.type === ProductEngineType.SPOT) {
        setSpotPriceInput(price);
      }
    },
    [marketStaticData?.all, setPerpPriceInput, setSpotPriceInput],
  );
}

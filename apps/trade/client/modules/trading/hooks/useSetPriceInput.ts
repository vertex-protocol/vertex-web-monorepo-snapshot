import { ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { perpPriceInputAtom } from 'client/store/trading/perpTradingStore';
import { spotPriceInputAtom } from 'client/store/trading/spotTradingStore';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

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

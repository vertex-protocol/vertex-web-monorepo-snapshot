import { ProductEngineType } from '@vertex-protocol/client';
import { useMemo, useState } from 'react';
import { MarketSwitcherItem } from './useMarketSwitcher/types';
import {
  useMarketSwitcher,
  UseMarketSwitcher,
} from './useMarketSwitcher/useMarketSwitcher';

interface UseTradingMarketSwitcher extends UseMarketSwitcher {
  selectedMarket: MarketSwitcherItem | undefined;
  isMarketSwitcherOpen: boolean;
  disableMarketSwitcherButton: boolean;
  setIsMarketSwitcherOpen: (open: boolean) => void;
}

export function useTradingMarketSwitcher(
  productId: number | undefined,
  defaultMarketType: ProductEngineType,
): UseTradingMarketSwitcher {
  const { allMarkets, displayedMarkets, ...rest } =
    useMarketSwitcher(defaultMarketType);

  const [isMarketSwitcherOpen, setIsMarketSwitcherOpen] = useState(false);

  const selectedMarket = useMemo(() => {
    if (!allMarkets) {
      return;
    }
    return allMarkets.find((item) => item.productId === productId);
  }, [allMarkets, productId]);

  const disableMarketSwitcherButton = !allMarkets || !allMarkets.length;

  return {
    allMarkets,
    displayedMarkets,
    selectedMarket,
    isMarketSwitcherOpen,
    disableMarketSwitcherButton,
    setIsMarketSwitcherOpen,
    ...rest,
  };
}

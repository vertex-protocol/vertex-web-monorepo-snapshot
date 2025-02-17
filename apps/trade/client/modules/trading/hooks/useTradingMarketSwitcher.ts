import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import {
  useMarketSwitcher,
  UseMarketSwitcher,
} from 'client/modules/trading/hooks/useMarketSwitcher/useMarketSwitcher';
import { MarketCategory } from '@vertex-protocol/react-client';
import { useMemo, useState } from 'react';

interface UseTradingMarketSwitcher extends UseMarketSwitcher {
  selectedMarket: MarketSwitcherItem | undefined;
  isMarketSwitcherOpen: boolean;
  disableMarketSwitcherButton: boolean;
  setIsMarketSwitcherOpen: (open: boolean) => void;
}

export function useTradingMarketSwitcher(
  productId: number | undefined,
  defaultMarketCategory: MarketCategory,
): UseTradingMarketSwitcher {
  const { allMarkets, displayedMarkets, ...rest } = useMarketSwitcher(
    defaultMarketCategory,
  );

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

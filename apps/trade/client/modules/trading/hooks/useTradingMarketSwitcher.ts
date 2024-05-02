import { ProductEngineType } from '@vertex-protocol/client';
import { openMarketSwitcherAtom } from 'client/store/trading/commonTradingStore';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { TradeSwitcherItem } from './useTradeSwitcher/types';
import {
  useTradeSwitcher,
  UseTradeSwitcher,
} from './useTradeSwitcher/useTradeSwitcher';

interface UseTradingMarketSwitcher extends UseTradeSwitcher {
  selectedMarket: TradeSwitcherItem | undefined;
  displayedMarkets: TradeSwitcherItem[];
  isMarketSwitcherOpen: boolean;
  disableMarketSwitcherButton: boolean;
  setIsMarketSwitcherOpen: (open: boolean) => void;
}

export function useTradingMarketSwitcher(
  productId: number | undefined,
  defaultMarketType: ProductEngineType,
): UseTradingMarketSwitcher {
  const { allMarkets, displayedMarkets, ...rest } =
    useTradeSwitcher(defaultMarketType);

  const [isMarketSwitcherOpen, setIsMarketSwitcherOpen] = useAtom(
    openMarketSwitcherAtom,
  );

  const selectedMarket = useMemo(() => {
    if (!allMarkets) {
      return;
    }
    return allMarkets.find((item) => item.market.productId === productId);
  }, [allMarkets, productId]);

  const disableMarketSwitcherButton = !displayedMarkets.length;

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

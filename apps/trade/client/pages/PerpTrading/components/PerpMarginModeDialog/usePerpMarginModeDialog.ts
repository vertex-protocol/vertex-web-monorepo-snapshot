import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useSelectedPerpMarginMode } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarginMode';
import { useCallback, useEffect, useState } from 'react';

const PERP_MARGIN_MODE_TABS: TabIdentifiable<MarginModeType>[] = [
  {
    id: 'isolated',
  },
  {
    id: 'cross',
  },
];

export function usePerpMarginModeDialog({ productId }: { productId: number }) {
  const { hide } = useDialog();
  const {
    selectedMarginMode: savedMarginMode,
    setSelectedMarginMode: setSavedMarginMode,
  } = useSelectedPerpMarginMode(productId);
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const currentMarket = allMarketsStaticData?.perpMarkets[productId];

  const maxLeverage = currentMarket?.maxLeverage ?? 1;

  // Local state
  const {
    selectedTabId: selectedMarginModeTabId,
    setSelectedUntypedTabId: setSelectedMarginModeTabId,
    tabs: marginModeTabs,
  } = useTabs(PERP_MARGIN_MODE_TABS);
  const [leverage, setLeverage] = useState(maxLeverage);
  const [enableIsoBorrows, setEnableIsoBorrows] = useState(true);

  // Sync with saved data
  useEffect(() => {
    setSelectedMarginModeTabId(savedMarginMode.mode);
    setLeverage(savedMarginMode.leverage);

    if (savedMarginMode.mode === 'isolated') {
      setEnableIsoBorrows(savedMarginMode.enableBorrows);
    }
  }, [savedMarginMode, setSelectedMarginModeTabId]);

  const onSaveClick = useCallback(() => {
    switch (selectedMarginModeTabId) {
      case 'isolated':
        setSavedMarginMode({
          mode: 'isolated',
          leverage,
          enableBorrows: enableIsoBorrows,
        });
        break;
      case 'cross':
        setSavedMarginMode({
          mode: 'cross',
          leverage,
        });
        break;
    }

    hide();
  }, [
    selectedMarginModeTabId,
    hide,
    setSavedMarginMode,
    leverage,
    enableIsoBorrows,
  ]);

  return {
    hide,
    selectedMarginModeTabId,
    setSelectedMarginModeTabId,
    marginModeTabs,
    leverage,
    setLeverage,
    currentMarket,
    maxLeverage,
    enableIsoBorrows,
    setEnableIsoBorrows,
    onSaveClick,
  };
}

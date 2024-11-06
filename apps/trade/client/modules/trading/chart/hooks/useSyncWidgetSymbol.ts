import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';
import { isChartSyncedToSymbolInfo } from 'client/modules/trading/chart/utils/isChartSyncedToSymbolInfo';
import { IChartingLibraryWidget } from 'public/charting_library/charting_library';
import { useEffect } from 'react';

interface Params {
  tvWidget: IChartingLibraryWidget | undefined;
  selectedSymbolInfo: TradingViewSymbolInfo | undefined;
  setLoadedSymbolInfo: (symbol: TradingViewSymbolInfo) => void;
}

export function useSyncWidgetSymbol({
  tvWidget,
  selectedSymbolInfo,
  setLoadedSymbolInfo,
}: Params) {
  useEffect(() => {
    if (!selectedSymbolInfo || !tvWidget) {
      return;
    }

    const activeChart = tvWidget.activeChart();
    const activeChartSymbol = activeChart.symbol();

    if (isChartSyncedToSymbolInfo(activeChartSymbol, selectedSymbolInfo)) {
      setLoadedSymbolInfo(selectedSymbolInfo);
      return;
    }

    tvWidget.setSymbol(
      selectedSymbolInfo.ticker,
      activeChart.resolution(),
      () => {
        console.debug(
          '[TradingViewChart] Loaded product for chart',
          selectedSymbolInfo.ticker,
          selectedSymbolInfo.name,
        );
        setLoadedSymbolInfo(selectedSymbolInfo);
      },
    );
  }, [selectedSymbolInfo, tvWidget, setLoadedSymbolInfo]);
}

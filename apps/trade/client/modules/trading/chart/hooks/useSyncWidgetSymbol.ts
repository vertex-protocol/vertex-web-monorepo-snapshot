import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';
import { IChartingLibraryWidget } from 'public/charting_library/charting_library';
import { useEffect } from 'react';
import { isChartSyncedToSymbolInfo } from '../utils/isChartSyncedToSymbolInfo';

interface Params {
  tvWidget: IChartingLibraryWidget | undefined;
  selectedSymbolInfo: TradingViewSymbolInfo | undefined;
}

export function useSyncWidgetSymbol({ tvWidget, selectedSymbolInfo }: Params) {
  useEffect(() => {
    if (!selectedSymbolInfo || !tvWidget) {
      return;
    }

    const activeChart = tvWidget.activeChart();
    const activeChartSymbol = activeChart.symbol();

    if (isChartSyncedToSymbolInfo(activeChartSymbol, selectedSymbolInfo)) {
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
      },
    );
  }, [selectedSymbolInfo, tvWidget]);
}

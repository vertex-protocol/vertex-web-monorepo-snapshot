import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';
import { useApplyWidgetOverrides } from 'client/modules/trading/chart/hooks/useApplyWidgetOverrides';
import { useDrawChartEntryLines } from 'client/modules/trading/chart/hooks/useDrawChartEntryLines';
import { useDrawChartLinesWhenReady } from 'client/modules/trading/chart/hooks/useDrawChartLinesWhenReady';
import { useDrawChartOrderLines } from 'client/modules/trading/chart/hooks/useDrawChartOrderLines';
import { useSyncWidgetSymbol } from 'client/modules/trading/chart/hooks/useSyncWidgetSymbol';
import { useTradingViewData } from 'client/modules/trading/chart/hooks/useTradingViewData/useTradingViewData';
import { useTradingViewWidget } from 'client/modules/trading/chart/hooks/useTradingViewWidget';
import { useUpdateLimitPriceOnCrosshairClick } from 'client/modules/trading/chart/hooks/useUpdateLimitPriceOnCrosshairClick';
import { MutableRefObject, useState } from 'react';

interface UseTradingViewChart {
  isReady: boolean;
  chartContainerRef: MutableRefObject<HTMLDivElement | null>;
}

export function useTradingViewChart(productId?: number): UseTradingViewChart {
  const { datafeed, symbolInfoByProductId } = useTradingViewData({
    currentProductId: productId,
  });

  const selectedSymbolInfo =
    symbolInfoByProductId && productId
      ? symbolInfoByProductId[productId]
      : undefined;

  const { tvWidget, chartContainerRef } = useTradingViewWidget({
    selectedSymbolInfo,
    datafeed,
  });

  // Updates the orderform limit price when the crosshair on the widget
  useUpdateLimitPriceOnCrosshairClick({
    tvWidget,
    productId,
  });

  // Apply override settings/styling to the widget
  useApplyWidgetOverrides(tvWidget);

  // loadedSymbolInfo is set once selectedSymbolInfo is loaded on the widget
  const [loadedSymbolInfo, setLoadedSymbolInfo] = useState<
    TradingViewSymbolInfo | undefined
  >();

  // Set the selected product ticker on chart itself, set loadedSymbolInfo once it is loaded/sync
  useSyncWidgetSymbol({
    tvWidget,
    selectedSymbolInfo,
    setLoadedSymbolInfo,
  });

  // Add order lines to the chart
  const drawOrderLines = useDrawChartOrderLines({
    tvWidget,
    loadedSymbolInfo,
  });

  // Add entry lines to the chart
  const drawEntryLine = useDrawChartEntryLines({
    tvWidget,
    loadedSymbolInfo,
  });

  // Draw lines on the chart when the widget is ready
  useDrawChartLinesWhenReady({
    tvWidget,
    loadedSymbolInfo,
    drawOrderLines,
    drawEntryLine,
  });

  return { isReady: !!tvWidget, chartContainerRef };
}

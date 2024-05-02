import { MutableRefObject, useCallback } from 'react';
import { useDrawChartLinesWhenReady } from 'client/modules/trading/chart/hooks/useDrawChartLinesWhenReady';
import { useSyncWidgetSymbol } from 'client/modules/trading/chart/hooks/useSyncWidgetSymbol';
import { useTradingViewData } from 'client/modules/trading/chart/hooks/useTradingViewData/useTradingViewData';
import { useTradingViewWidget } from 'client/modules/trading/chart/hooks/useTradingViewWidget';
import { useApplyWidgetOverrides } from './useApplyWidgetOverrides';
import { useDrawChartEntryLines } from './useDrawChartEntryLines';
import { useDrawChartOrderLines } from './useDrawChartOrderLines';
import { useUpdateLimitPriceOnCrosshairClick } from './useUpdateLimitPriceOnCrosshairClick';

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

  // Set the selected product ticker on chart itself, when the symbol changes, the widget is unavailable for interactions (e.g. drawing order lines)
  useSyncWidgetSymbol({
    tvWidget,
    selectedSymbolInfo,
  });

  // Add order lines to the chart
  const drawOrderLines = useDrawChartOrderLines({
    tvWidget,
    selectedSymbolInfo,
  });

  // Add entry lines to the chart
  const drawEntryLine = useDrawChartEntryLines({
    tvWidget,
    selectedSymbolInfo,
  });

  // Wrapper to draw all lines on the chart
  const drawChartLines = useCallback(() => {
    drawOrderLines();
    drawEntryLine();
  }, [drawOrderLines, drawEntryLine]);

  // Draw lines on the chart when the widget is ready
  useDrawChartLinesWhenReady({
    drawChartLines,
  });

  return { isReady: !!tvWidget, chartContainerRef };
}

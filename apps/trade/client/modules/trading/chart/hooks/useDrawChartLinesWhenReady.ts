import { useEffect } from 'react';
import { IChartingLibraryWidget } from 'public/charting_library/charting_library';
import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';

interface Params {
  tvWidget: IChartingLibraryWidget | undefined;
  loadedSymbolInfo: TradingViewSymbolInfo | undefined;
  drawOrderLines: () => void;
  drawEntryLine: () => void;
}

/**
 * NOTE: The previous implementation of this had some fancy logic for handling the widget being ready, but it was
 * never really bulletproof. For the sake of simplicity, we just `try/catch` all draw attempts and ignore errors.
 */
export function useDrawChartLinesWhenReady({
  tvWidget,
  loadedSymbolInfo,
  drawOrderLines,
  drawEntryLine,
}: Params) {
  // Draw chart lines on reload of the callback - the individual draw functions will reload on data changes, so having
  // this effect ensures that data is always brought up to date
  useEffect(() => {
    try {
      drawOrderLines();
    } catch (err) {
      console.debug(
        '[useDrawOrderLinesWhenReady] Failed to draw order lines',
        err,
      );
    }
  }, [drawOrderLines, tvWidget, loadedSymbolInfo]);

  useEffect(() => {
    try {
      drawEntryLine();
    } catch (err) {
      console.debug(
        '[useDrawChartLinesWhenReady] Failed to draw entry lines',
        err,
      );
    }
  }, [drawEntryLine, tvWidget, loadedSymbolInfo]);
}

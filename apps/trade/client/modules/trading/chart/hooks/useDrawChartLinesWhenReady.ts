import { useEffect } from 'react';

interface Params {
  drawOrderLines: () => void;
  drawEntryLine: () => void;
}

/**
 * NOTE: The previous implementation of this had some fancy logic for handling the widget being ready, but it was
 * never really bulletproof. For the sake of simplicity, we just `try/catch` all draw attempts and ignore errors.
 */
export function useDrawChartLinesWhenReady({
  drawOrderLines,
  drawEntryLine,
}: Params) {
  // Draw chart lines on reload of the callback - the individual draw functions will reload on data changes, so having
  // this effect ensures that data is always brought up to date
  useEffect(() => {
    // Wrap in try-catch as this is prone to errors, especially on initial chart load / symbol switches
    try {
      drawOrderLines();
    } catch (err) {
      console.debug(
        '[useDrawOrderLinesWhenReady] Failed to draw order lines',
        err,
      );
    }
  }, [drawOrderLines]);

  useEffect(() => {
    try {
      drawEntryLine();
    } catch (err) {
      console.debug(
        '[useDrawChartLinesWhenReady] Failed to draw entry lines',
        err,
      );
    }
  }, [drawEntryLine]);
}

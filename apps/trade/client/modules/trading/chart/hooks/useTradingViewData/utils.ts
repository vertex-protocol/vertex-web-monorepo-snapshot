import { Candlestick } from '@vertex-protocol/client';
import type { Bar } from 'public/charting_library';
import { removeDecimals } from 'client/utils/decimalAdjustment';

export function toTVCandlesticks(candlesticks: Candlestick[]) {
  // Candlesticks are in descending order, but TV wants them to be in ascending order
  const bars = candlesticks.reverse().map((candlestick) => {
    return toTVCandlestick(candlestick);
  });

  return bars.map((bar, index) => {
    if (index === 0) {
      return bar;
    }

    // Alter data such that we don't have a price-gap with an empty candle, so change the open / high / low such that we also use the previous bar's close
    const prevBarClose = bars[index - 1].close;
    return syncBarOpenWithValue(bar, prevBarClose);
  });
}

export function toTVCandlestick(candlestick: Candlestick): Bar {
  return {
    volume: removeDecimals(candlestick.volume).toNumber(),
    time: candlestick.time.times(1000).toNumber(),
    high: candlestick.high.toNumber(),
    low: candlestick.low.toNumber(),
    close: candlestick.close.toNumber(),
    open: candlestick.open.toNumber(),
  };
}

/**
 * Sets properties of the given bar to the given value, which is useful for
 * preventing invalid bars and gaps between candles. Properties set include:
 *   - Open, set unconditionally.
 *   - High, set if the given value is greater than the bar's high.
 *   - Low, set if the given value is greater than the bar's low.
 */
export function syncBarOpenWithValue(bar: Bar, value: number): Bar {
  const syncedBar = { ...bar };

  syncedBar.open = value;
  syncedBar.high = Math.max(value, bar.high);
  syncedBar.low = Math.min(value, bar.low);

  return syncedBar;
}

export function getLastBarMapKey(productId: number, period: number) {
  return [productId, period].join('_#_');
}

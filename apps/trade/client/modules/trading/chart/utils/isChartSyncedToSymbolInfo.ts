import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';

/**
 * Check if the chart symbol selected in the active TV chart is the same as the symbol info
 * implied from the product ID. This check is useful in circumstances where we want to delay updates
 * (ex. drawing order lines) until the active chart switches to the correct symbol.
 *
 * @param activeChartSymbol given by `tvWidget.activeChart().symbol()` - this gives the ticker of the active symbol (product ID)
 * @param selectedSymbolInfo given by the resolved symbol info from the current product ID
 */
export function isChartSyncedToSymbolInfo(
  activeChartSymbol: string,
  selectedSymbolInfo: TradingViewSymbolInfo,
): boolean {
  return (
    activeChartSymbol.toLowerCase() === selectedSymbolInfo.ticker.toLowerCase()
  );
}

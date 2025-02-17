import { ProductEngineType } from '@vertex-protocol/client';
import {
  formatNumber,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import {
  PerpPositionItem,
  usePerpPositions,
} from 'client/hooks/subaccount/usePerpPositions';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';
import { isChartSyncedToSymbolInfo } from 'client/modules/trading/chart/utils/isChartSyncedToSymbolInfo';
import { COLORS } from 'common/theme/colors';
import { FONTS } from 'common/theme/fonts';
import {
  IChartingLibraryWidget,
  IChartWidgetApi,
  IPositionLineAdapter,
} from 'public/charting_library';
import { useCallback, useEffect, useRef } from 'react';

interface Params {
  tvWidget: IChartingLibraryWidget | undefined;
  loadedSymbolInfo: TradingViewSymbolInfo | undefined;
}

type EntryLineByMarginModeType = Map<MarginModeType, IPositionLineAdapter>;

// Mapping from product ID to the average isolated/cross entry line for that product
type EntryLineByProductId = Map<number, EntryLineByMarginModeType>;

export function useDrawChartEntryLines({ tvWidget, loadedSymbolInfo }: Params) {
  const existingLinesByProductId = useRef<EntryLineByProductId>(new Map());
  const { data: perpPositionsData } = usePerpPositions();
  const { data: marketsStaticData } = useAllMarketsStaticData();
  const { show } = useDialog();

  // When TV Widget reloads, clear any cached lines as they are all removed
  useEffect(() => {
    existingLinesByProductId.current.clear();
  }, [tvWidget]);

  /**
   * Cases:
   * - Not spot: no action needed
   * - No position: clear line if exists
   * - No existing line: create
   * - Existing line: update
   */
  return useCallback(() => {
    if (
      !loadedSymbolInfo ||
      loadedSymbolInfo.productType === ProductEngineType.SPOT
    ) {
      return;
    }

    const selectedProductId = loadedSymbolInfo?.productId;
    const marketData = marketsStaticData?.all[selectedProductId];

    if (!tvWidget || !marketData || !selectedProductId || !perpPositionsData) {
      return;
    }

    const activeChart = tvWidget.activeChart();
    const activeChartSymbol = activeChart.symbol();

    if (!isChartSyncedToSymbolInfo(activeChartSymbol, loadedSymbolInfo)) {
      return;
    }

    const openPositions = perpPositionsData.filter(
      (position) => position.productId === selectedProductId,
    );

    const existingEntryLines: EntryLineByMarginModeType =
      existingLinesByProductId.current.get(selectedProductId) ?? new Map();

    const newEntryLines: EntryLineByMarginModeType = new Map();

    openPositions.forEach((position) => {
      const marginModeType: MarginModeType = !!position.iso
        ? 'isolated'
        : 'cross';
      const hasNoPosition = position.amount.isZero();
      const hasInvalidData = !position.price.averageEntryPrice?.toNumber(); // Undefined or 0.

      const existingLine = existingEntryLines.get(marginModeType);

      // If there is no position or invalid data. This will remove the line afterwards.
      if (hasNoPosition || hasInvalidData) {
        return;
      }

      if (existingLine) {
        // No further action needed if position amount for entry line has not changed. Keep the existing line.
        if (position.amount.eq(existingLine.getQuantity())) {
          console.debug(
            '[useDrawChartEntryLines]: Keeping position line:',
            position.productId,
            marginModeType,
          );
          newEntryLines.set(marginModeType, existingLine);
          return;
        }
      }

      console.debug(
        '[useDrawChartEntryLines]: Upserting position entry line:',
        position.productId,
        position.amount.toString(),
        position.price.averageEntryPrice?.toString(),
        marginModeType,
      );

      const sizeFormatSpecifier = getMarketSizeFormatSpecifier(
        marketData.sizeIncrement,
      );

      const onClosePositionClick = () => {
        show({
          type: 'close_position',
          params: {
            productId: position.productId,
            isoSubaccountName: position.iso?.subaccountName,
          },
        });
      };

      // Create or update the TV entry line and add it to the map
      const line = createOrUpdateEntryLine(
        activeChart,
        position,
        sizeFormatSpecifier,
        onClosePositionClick,
        existingLine,
      );

      newEntryLines.set(marginModeType, line);
    });

    // Remove lines no longer relevant ie) those in existingEntryLines but not in newEntryLines
    existingEntryLines.forEach((line, marginModeType) => {
      if (!newEntryLines.has(marginModeType)) {
        console.debug(
          '[useDrawChartEntryLines]: Removing position entry line:',
          marginModeType,
        );
        line.remove();
      }
    });

    existingLinesByProductId.current.set(selectedProductId, newEntryLines);
  }, [
    loadedSymbolInfo,
    marketsStaticData?.all,
    perpPositionsData,
    show,
    tvWidget,
  ]);
}

function createOrUpdateEntryLine(
  activeChart: IChartWidgetApi,
  position: PerpPositionItem,
  sizeFormatSpecifier: string,
  onClosePositionClick: () => void,
  existingLine?: IPositionLineAdapter,
): IPositionLineAdapter {
  const sideColor = position.amount.isPositive()
    ? COLORS.positive.DEFAULT
    : COLORS.negative.DEFAULT;
  const sideTextColor = position.amount.isPositive()
    ? COLORS.positive.muted
    : COLORS.negative.muted;

  const isIso = !!position.iso;
  // At this point, average entry price should never be undefined
  const averageEntryPrice = position.price.averageEntryPrice?.toNumber() ?? 0;
  const contentText = `${position.amount.gt(0) ? `Long` : `Short`}${isIso ? ' (Iso)' : ''}`;
  const amountText = formatNumber(position.amount.abs(), {
    formatSpecifier: sizeFormatSpecifier,
  });

  const entryLine = existingLine ?? activeChart.createPositionLine();
  return entryLine
    .setPrice(averageEntryPrice)
    .setBodyTextColor(sideTextColor)
    .setBodyBorderColor('')
    .setBodyBackgroundColor(sideColor)
    .setBodyFont(`11px var(${FONTS.default.variable})`)
    .setText(contentText)
    .setLineLength(isIso ? 64 : 48) // Distance from orderbox to right-most side of chart. Adjust if isolated to avoid overlap.
    .setLineStyle(0) // we use 0 (solid) for entry lines, 2 (dashed) for order lines
    .setLineColor(sideColor)
    .setQuantity(amountText)
    .setQuantityFont(`11px var(${FONTS.default.variable})`)
    .setQuantityTextColor(sideTextColor)
    .setQuantityBackgroundColor(sideColor)
    .setQuantityBorderColor('')
    .onClose(onClosePositionClick)
    .setCloseButtonBackgroundColor(sideColor)
    .setCloseButtonBorderColor('')
    .setCloseButtonIconColor(sideTextColor);
}

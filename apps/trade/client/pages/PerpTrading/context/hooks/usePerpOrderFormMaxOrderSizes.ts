import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { safeDiv } from '@vertex-protocol/web-common';
import { PerpStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useMaxWithdrawableAmount } from 'client/hooks/query/subaccount/useMaxWithdrawableAmount';
import { PerpPositionItem } from 'client/hooks/subaccount/usePerpPositions';
import { useDebounceFalsy } from 'client/hooks/util/useDebounceFalsy';
import { MarginMode } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import {
  OrderFormMaxOrderSizes,
  useOrderFormMaxOrderSizes,
  UseOrderFormMaxOrderSizesParams,
} from 'client/modules/trading/hooks/orderFormContext/useOrderFormMaxOrderSizes';
import { mapValues } from 'lodash';
import { useMemo } from 'react';

interface Params
  extends Omit<
    UseOrderFormMaxOrderSizesParams,
    'spotLeverageEnabled' | 'disabled' | 'allowAnyOrderSizeIncrement'
  > {
  marginMode: MarginMode;
  currentMarket: PerpStaticMarketData | undefined;
  currentPosition: PerpPositionItem | undefined;
  isReducingIsoPosition: boolean;
}

export function usePerpOrderFormMaxOrderSizes({
  executionConversionPrice,
  inputConversionPrice,
  orderSide,
  productId,
  roundAmount,
  marginMode,
  currentMarket,
  isReducingIsoPosition,
  currentPosition,
}: Params) {
  const selectedLeverage = marginMode.leverage;

  /**
   * Cross margin - use the standard max order sizing
   */

  const crossMaxOrderSizes = useOrderFormMaxOrderSizes({
    inputConversionPrice,
    executionConversionPrice,
    orderSide,
    productId,
    roundAmount,
    allowAnyOrderSizeIncrement: false,
    disabled: marginMode.mode === 'isolated',
  });

  const crossMaxOrderSizesWithLeverage = useMemo(() => {
    if (!crossMaxOrderSizes || !currentMarket) {
      return;
    }
    // Leverage ONLY impacts max order size, given by (true max order size) * leverage / max leverage
    return mapValues(crossMaxOrderSizes, (val) =>
      val.multipliedBy(selectedLeverage).dividedBy(currentMarket.maxLeverage),
    );
  }, [currentMarket, crossMaxOrderSizes, selectedLeverage]);

  /**
   * Isolated margin - order sizes are limited by:
   *   - If increasing position, the max withdrawable (ie margin transfer)
   *   - if decreasing position, the current position size
   */

  const { data: maxWithdrawableAmount } = useMaxWithdrawableAmount({
    productId: QUOTE_PRODUCT_ID,
    spotLeverage: marginMode.enableBorrows,
    disabled: marginMode.mode !== 'isolated' || isReducingIsoPosition,
  });
  // Same rounding logic & debouncing as useOrderFormMaxOrderSizes, but assuming that allowAnyOrderSizeIncrement is always false (i.e we always round amount)
  const isoMaxSizes = useMemo((): OrderFormMaxOrderSizes | undefined => {
    if (!inputConversionPrice) {
      return;
    }

    // If decreasing position, they can only close their position
    if (isReducingIsoPosition) {
      if (!currentPosition) {
        return;
      }
      const currentPositionSize = currentPosition.amount.abs();
      return {
        asset: currentPositionSize,
        quote: currentPositionSize.multipliedBy(inputConversionPrice),
      };
    }

    // Increasing otherwise
    if (!maxWithdrawableAmount) {
      return;
    }

    const decimalAdjustedMaxWithdrawableAmount = removeDecimals(
      maxWithdrawableAmount,
    );
    const maxTotalQuoteSize =
      decimalAdjustedMaxWithdrawableAmount.multipliedBy(selectedLeverage);
    const maxAssetSize = safeDiv(maxTotalQuoteSize, inputConversionPrice);

    return {
      asset: roundAmount(maxAssetSize),
      quote: maxTotalQuoteSize,
    };
  }, [
    inputConversionPrice,
    isReducingIsoPosition,
    maxWithdrawableAmount,
    selectedLeverage,
    roundAmount,
    currentPosition,
  ]);
  const debouncedIsoMaxSizes = useDebounceFalsy(isoMaxSizes);

  return marginMode.mode === 'isolated'
    ? debouncedIsoMaxSizes
    : crossMaxOrderSizesWithLeverage;
}

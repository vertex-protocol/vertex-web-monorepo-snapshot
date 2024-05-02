import { useMemo } from 'react';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { PlaceOrderPriceType } from 'client/modules/trading/types';
import { BalanceSide } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';

interface Params {
  priceType: PlaceOrderPriceType;
  firstExecutionPrice: BigDecimal | undefined;
  topOfBookPrice: BigDecimal | undefined;
  validatedPriceInput?: BigDecimal;
  orderSide: BalanceSide;
  roundPrice: (price: BigDecimal) => BigDecimal;
}

export function useOrderFormConversionPrices({
  priceType,
  firstExecutionPrice,
  topOfBookPrice,
  validatedPriceInput,
  orderSide,
  roundPrice,
}: Params) {
  const {
    savedSettings: {
      market: marketSlippageFraction,
      stopMarket: stopMarketSlippageFraction,
    },
  } = useOrderSlippageSettings();
  const slippageFraction = (() => {
    switch (priceType) {
      case 'market':
        return marketSlippageFraction;
      case 'stop':
        return stopMarketSlippageFraction;
      default:
        // Limit order - not relevant as slippageFraction shouldn't be used
        return 0;
    }
  })();

  const inputConversionPrice =
    priceType === 'market' ? firstExecutionPrice : validatedPriceInput;
  const executionConversionPrice = useMemo(() => {
    // Limit orders, use user entry
    if (priceType === 'limit') {
      return validatedPriceInput;
    }

    // Market / stop market order have slippage applied
    const slippageMultiplier =
      orderSide === 'long' ? 1 + slippageFraction : 1 - slippageFraction;

    // Market order - Add slippage on the top of book price so that spread is included in the price with slippage
    if (priceType === 'market' && topOfBookPrice != null) {
      return roundPrice(topOfBookPrice.multipliedBy(slippageMultiplier));
    }

    // Stop order - Add slippage on the trigger price
    if (priceType === 'stop' && validatedPriceInput != null) {
      return roundPrice(validatedPriceInput.multipliedBy(slippageMultiplier));
    }
  }, [
    priceType,
    orderSide,
    slippageFraction,
    topOfBookPrice,
    validatedPriceInput,
    roundPrice,
  ]);

  // Conversion prices can change frequently, use a ref for certain usecases
  const inputConversionPriceRef = useSyncedRef(inputConversionPrice);
  const executionConversionPriceRef = useSyncedRef(executionConversionPrice);

  return {
    inputConversionPrice,
    inputConversionPriceRef,
    executionConversionPrice,
    executionConversionPriceRef,
    slippageFraction,
  };
}

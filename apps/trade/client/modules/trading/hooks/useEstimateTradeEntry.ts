import { BalanceSide } from '@vertex-protocol/contracts';
import {
  addDecimals,
  BigDecimal,
  BigDecimals,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useMarketLiquidity } from 'client/hooks/query/markets/useMarketLiquidity';
import { useSubaccountFeeRates } from 'client/hooks/query/subaccount/useSubaccountFeeRates';
import { useMemo } from 'react';

export interface EstimateEntryParams {
  productId: number | undefined;
  // Amount of product in input (ex. 1.1 USDC)
  amountInput?: BigDecimal;
  // Limit price submitted to book
  executionLimitPrice?: BigDecimal;
  // Order side buy/sell
  orderSide: BalanceSide;
}

export interface TradeEntryEstimate {
  // Last price at which the order will be filled, i.e. the lowest price touched if sell, the highest price touched if buy
  lastFilledPrice: BigDecimal;
  // Weighted average fill price of the amount (includes both immediately filled and any resting on book)
  // The fill price of amount left on book is just the limit price itself
  avgFillPrice: BigDecimal;
  // Weighted average fill price of ONLY the amount immediately filled
  avgTakerFillPrice: BigDecimal;
  // Amount immediately filled (i.e. as a taker)
  takerFilledAmount: BigDecimal;
  // Amount left on book (i.e. as a maker)
  onBookAmount: BigDecimal;
  // Estimated fee (taker + maker)
  estimatedFee: BigDecimal;
  // Estimated total cost of the order
  estimatedTotal: BigDecimal;
}

export function useEstimateTradeEntry({
  amountInput,
  executionLimitPrice,
  productId,
  orderSide,
}: EstimateEntryParams) {
  const { data: marketLiquidity } = useMarketLiquidity({
    includeWebsocketUpdates: false,
    productId,
  });
  const { data: subaccountFeeRates } = useSubaccountFeeRates();

  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const marketStaticData = productId
    ? allMarketsStaticData?.all[productId]
    : undefined;

  return useMemo((): TradeEntryEstimate | undefined => {
    if (
      !executionLimitPrice ||
      !amountInput ||
      !marketLiquidity ||
      !subaccountFeeRates ||
      !marketStaticData
    ) {
      return;
    }

    const decimalAdjustedAmount = addDecimals(amountInput ?? BigDecimals.ZERO);

    // Adjust signage depending if sell/short or buy/long
    const signAdjustedAmount =
      orderSide === 'long'
        ? decimalAdjustedAmount
        : decimalAdjustedAmount.negated();

    let initialAmountAbs = toBigDecimal(signAdjustedAmount).abs();
    let currAmountAbs = initialAmountAbs;

    // Look at buy orders if selling, vice versa, assume these are sorted in order of book traversal (i.e. if selling, highest price first)
    const liquidityLevels = signAdjustedAmount.isNegative()
      ? marketLiquidity.bids
      : marketLiquidity.asks;

    let avgFillPrice = BigDecimals.ZERO;
    let lastFilledPrice = BigDecimals.ZERO;

    for (const level of liquidityLevels) {
      // No more relevant levels
      const pastSellLimitPrice =
        signAdjustedAmount.isNegative() && level.price.lt(executionLimitPrice);
      const pastBuyLimitPrice =
        signAdjustedAmount.isPositive() && level.price.gt(executionLimitPrice);
      if (pastSellLimitPrice || pastBuyLimitPrice || currAmountAbs.isZero()) {
        break;
      }

      // Amount filled at this book level
      const filledAmount = BigDecimal.min(currAmountAbs, level.liquidity);

      // Update tracked vals
      // weighted average fill price += (filled/total) * price
      avgFillPrice = avgFillPrice.plus(
        filledAmount.div(initialAmountAbs).times(level.price),
      );
      lastFilledPrice = level.price;

      // Update amount still left
      currAmountAbs = currAmountAbs.minus(filledAmount);
    }

    // After this, rest is maker

    // If nothing was filled, default this to the given price
    lastFilledPrice = lastFilledPrice.eq(0)
      ? executionLimitPrice
      : lastFilledPrice;
    const takerFilledAmount = initialAmountAbs.minus(currAmountAbs);

    // For readability, return early if the order was not filled at all as a taker, this means all of it is on book
    if (takerFilledAmount.isZero()) {
      return {
        onBookAmount: initialAmountAbs,
        avgFillPrice: executionLimitPrice,
        avgTakerFillPrice: executionLimitPrice,
        // Assume zero maker fees
        estimatedFee: BigDecimals.ZERO,
        estimatedTotal: removeDecimals(
          initialAmountAbs.multipliedBy(executionLimitPrice),
        ),
        lastFilledPrice,
        takerFilledAmount,
      };
    }

    // Avg fill price above is weighted by taker filled amount / total requested, so adjust accordingly
    const avgTakerFillPrice = avgFillPrice
      .multipliedBy(initialAmountAbs)
      .div(takerFilledAmount);
    const onBookAmount = currAmountAbs;

    if (onBookAmount.gt(0)) {
      // Calc such that the rest is filled at the last seen price
      avgFillPrice = avgFillPrice.plus(
        onBookAmount.div(initialAmountAbs).times(lastFilledPrice),
      );
    }

    /**
     * Assume only taker fee
     * There's an immediate fee = minSize * maker_order.price * fee rate
     * In the interval [0, minSize), there are no fees aside from the immediate fee
     * Then beyond minSize, we have the standard fee = quote amount beyond minSize * fee rate
     *
     * This is effectively the same as: max(immediate fee, total quote amount * fee rate)
     */
    const estimatedTradeFee = (() => {
      const feeRateForProduct = (() => {
        if (!productId) {
          return BigDecimals.ZERO;
        }

        return subaccountFeeRates.orders[productId]?.taker ?? BigDecimals.ZERO;
      })();

      const takerTotalQuote = takerFilledAmount.times(avgTakerFillPrice);

      // If the amount is less than min limit order size, then lastFilledPrice is the price of the first maker order
      if (takerFilledAmount.lt(marketStaticData.minSize)) {
        return marketStaticData.minSize
          .multipliedBy(lastFilledPrice)
          .multipliedBy(feeRateForProduct);
      }

      return takerTotalQuote.times(feeRateForProduct);
    })();
    const estimatedFee = estimatedTradeFee.plus(
      subaccountFeeRates.takerSequencerFee,
    );

    // Estimated total uses the avg fill across taker & maker
    // you get less USDC because of fee if selling, and spend more USDC if buying
    const estimatedTotal = initialAmountAbs
      .multipliedBy(avgFillPrice)
      .plus(
        signAdjustedAmount.isPositive() ? estimatedFee : estimatedFee.negated(),
      );

    return {
      onBookAmount: removeDecimals(onBookAmount),
      takerFilledAmount: removeDecimals(takerFilledAmount),
      // Average for taker fill price is 0 if none is filled, in which case, just use the limit price
      avgTakerFillPrice,
      avgFillPrice,
      estimatedFee: removeDecimals(estimatedFee),
      estimatedTotal: removeDecimals(estimatedTotal),
      lastFilledPrice,
    };
  }, [
    executionLimitPrice,
    amountInput,
    marketLiquidity,
    subaccountFeeRates,
    marketStaticData,
    orderSide,
    productId,
  ]);
}

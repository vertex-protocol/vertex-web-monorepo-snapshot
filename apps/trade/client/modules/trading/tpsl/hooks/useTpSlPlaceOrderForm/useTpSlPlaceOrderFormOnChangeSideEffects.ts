import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import { TpSlPlaceOrderFormValues } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';
import { LinkedPercentageAmountSource } from 'client/types/linkedPercentageAmountFormTypes';
import { calcPerpEntryCostBeforeLeverage } from 'client/utils/calcs/perp/perpEntryCostCalcs';
import { calcPnlFrac, calcPnl } from 'client/utils/calcs/pnlCalcs';
import { roundToIncrement, roundToString } from 'client/utils/rounding';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  useTpSlPlaceOrderForm: UseFormReturn<TpSlPlaceOrderFormValues>;
  savedTpSlTriggerPriceType: TriggerCriteriaPriceType;
  positionAmount: BigDecimal | undefined;
  positionNetEntry: BigDecimal | undefined;
  priceIncrement: BigDecimal | undefined;
  validGainOrLossPercentage: BigDecimal | undefined;
  longWeightInitial: BigDecimal | undefined;
  validTriggerPrice: BigDecimal | undefined;
  isTakeProfit: boolean;
  priceSource: LinkedPercentageAmountSource;
}

export function useTpSlPlaceOrderFormOnChangeSideEffects({
  useTpSlPlaceOrderForm,
  savedTpSlTriggerPriceType,
  validGainOrLossPercentage,
  validTriggerPrice,
  isTakeProfit,
  priceSource,
  longWeightInitial,
  priceIncrement,
  positionAmount,
  positionNetEntry,
}: Params) {
  useEffect(() => {
    useTpSlPlaceOrderForm.setValue(
      'triggerCriteriaPriceType',
      savedTpSlTriggerPriceType,
    );
  }, [useTpSlPlaceOrderForm, savedTpSlTriggerPriceType]);

  // Reset fields when position amount is zero. This is done separately from the
  // other effects because they run conditionally based on `priceSource`, meaning
  // only one field gets reset at a time.
  useEffect(() => {
    if (!positionAmount?.isZero()) {
      return;
    }

    useTpSlPlaceOrderForm.resetField('triggerPrice');
    useTpSlPlaceOrderForm.resetField('gainOrLossPercentage');
  }, [positionAmount, useTpSlPlaceOrderForm]);

  // Update percentage field when price field is updated.
  useEffect(() => {
    if (priceSource !== 'absolute') {
      return;
    }

    if (
      validTriggerPrice === undefined ||
      longWeightInitial === undefined ||
      positionNetEntry === undefined ||
      positionAmount === undefined ||
      positionAmount.isZero()
    ) {
      useTpSlPlaceOrderForm.resetField('gainOrLossPercentage');
      return;
    }

    const unrealizedPnl = calcPnl(
      positionAmount,
      validTriggerPrice,
      positionNetEntry,
    );

    const gainOrLossPercentage = calcPnlFrac(
      unrealizedPnl,
      calcPerpEntryCostBeforeLeverage(longWeightInitial, positionNetEntry),
    )
      .multipliedBy(100) // Get back to percentage.
      .multipliedBy(isTakeProfit ? 1 : -1); // Negate if SL.

    useTpSlPlaceOrderForm.setValue(
      'gainOrLossPercentage',
      roundToString(gainOrLossPercentage, 0),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validTriggerPrice, positionAmount, positionNetEntry]);

  // Update price field when percentage field is updated.
  useEffect(
    () => {
      if (priceSource !== 'percentage') {
        return;
      }

      if (
        validGainOrLossPercentage === undefined ||
        priceIncrement === undefined ||
        longWeightInitial === undefined ||
        positionNetEntry === undefined ||
        positionAmount === undefined ||
        positionAmount.isZero()
      ) {
        useTpSlPlaceOrderForm.resetField('triggerPrice');
        return;
      }

      // Trigger Price (oracle price) = ((pnl percentage / 100 * unrealized entry cost) + net entry unrealized)) / position amount.
      const triggerPrice = toBigDecimal(validGainOrLossPercentage)
        .dividedBy(100)
        .multipliedBy(
          calcPerpEntryCostBeforeLeverage(longWeightInitial, positionNetEntry),
        )
        .multipliedBy(isTakeProfit ? 1 : -1) // Negate if SL.
        .plus(positionNetEntry)
        .dividedBy(positionAmount);

      useTpSlPlaceOrderForm.setValue(
        'triggerPrice',
        roundToIncrement(triggerPrice, priceIncrement).toString(),
        { shouldTouch: true, shouldValidate: true },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validGainOrLossPercentage, positionAmount, positionNetEntry],
  );
}

import { UseFormReturn } from 'react-hook-form';
import { TpSlPlaceOrderFormValues } from './types';
import { useEffect } from 'react';
import {
  BigDecimal,
  IndexerSnapshotBalance,
  toBigDecimal,
} from '@vertex-protocol/client';
import { calcIndexerUnrealizedPerpEntryCost } from 'client/utils/calcs/perpEntryCostCalcs';
import {
  calcIndexerSummaryUnrealizedPnl,
  calcPnlFrac,
} from 'client/utils/calcs/pnlCalcs';
import { roundToDecimalPlaces, roundToIncrement } from 'client/utils/rounding';
import { LinkedPercentageAmountSource } from 'client/types/linkedPercentageAmountFormTypes';
import { TpSlPositionData, TriggerCriteriaPriceType } from '../../types';

interface Params {
  useTpSlPlaceOrderForm: UseFormReturn<TpSlPlaceOrderFormValues>;
  savedTpSlTriggerPriceType: TriggerCriteriaPriceType;
  tpSlPositionData: TpSlPositionData | undefined;
  validPnlFrac: number | undefined;
  indexerSnapshotBalance: IndexerSnapshotBalance | undefined;
  validTriggerPrice: BigDecimal | undefined;
  isTakeProfit: boolean;
  priceSource: LinkedPercentageAmountSource;
}

export function useTpSlPlaceOrderFormOnChangeSideEffects({
  useTpSlPlaceOrderForm,
  savedTpSlTriggerPriceType,
  tpSlPositionData,
  validPnlFrac,
  indexerSnapshotBalance,
  validTriggerPrice,
  isTakeProfit,
  priceSource,
}: Params) {
  useEffect(() => {
    useTpSlPlaceOrderForm.setValue(
      'triggerCriteriaPriceType',
      savedTpSlTriggerPriceType,
    );
  }, [useTpSlPlaceOrderForm, savedTpSlTriggerPriceType]);

  useEffect(() => {
    if (priceSource !== 'absolute') {
      return;
    }

    if (indexerSnapshotBalance != null && validTriggerPrice != null) {
      const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
        indexerSnapshotBalance,
        validTriggerPrice,
      );

      const pnlFrac = calcPnlFrac(
        unrealizedPnl,
        calcIndexerUnrealizedPerpEntryCost(indexerSnapshotBalance),
      );

      useTpSlPlaceOrderForm.setValue(
        'pnlFrac',
        roundToDecimalPlaces(pnlFrac.abs(), 2).toNumber(),
      );
    } else {
      useTpSlPlaceOrderForm.setValue('pnlFrac', 0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validTriggerPrice]);

  useEffect(
    () => {
      if (priceSource !== 'percentage') {
        return;
      }

      if (
        indexerSnapshotBalance != null &&
        tpSlPositionData?.priceIncrement != null &&
        validPnlFrac != null
      ) {
        /*
        Trigger Price (oracle price) = ((pnlFrac * unrealized entry cost) + net entry unrealized)) / position amount.
        */
        const triggerPrice = toBigDecimal(validPnlFrac)
          .times(isTakeProfit ? 1 : -1) // For Stop Loss PnL is negative, For Take Profit is positive.
          .times(calcIndexerUnrealizedPerpEntryCost(indexerSnapshotBalance))
          .plus(indexerSnapshotBalance.trackedVars.netEntryUnrealized)
          .dividedBy(indexerSnapshotBalance.state.postBalance.amount);

        useTpSlPlaceOrderForm.setValue(
          'triggerPrice',
          roundToIncrement(
            triggerPrice,
            tpSlPositionData.priceIncrement,
          ).toString(),
          { shouldTouch: true, shouldValidate: true },
        );
      } else {
        useTpSlPlaceOrderForm.resetField('triggerPrice');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [validPnlFrac],
  );
}

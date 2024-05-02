import { useMutation } from '@tanstack/react-query';
import { toPrintableObject } from '@vertex-protocol/utils';
import { PLACE_ENGINE_ORDER_QUERY_KEYS } from 'client/hooks/execute/placeOrder/placeEngineOrderQueryKeys';
import { usePlaceOrderMutationFn } from 'client/hooks/execute/placeOrder/usePlaceOrderMutationFn';
import { getMarketOrderExecutionPrice } from 'client/hooks/execute/util/getMarketOrderExecutionPrice';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { roundToString } from 'client/utils/rounding';
import { useCallback } from 'react';

interface ClosePositionParams {
  productId: number;
  fractionToClose: number;
}

/**
 * Sends a market order to close the position for a product ID
 */
export function useExecuteClosePosition() {
  const placeOrderMutationFn = usePlaceOrderMutationFn();
  const refetchPlaceEngineOrderRelatedQueries = useRefetchQueries(
    PLACE_ENGINE_ORDER_QUERY_KEYS,
  );
  const {
    savedSettings: { market: marketSlippageFraction },
  } = useOrderSlippageSettings();
  const { data: subaccountSummary } = useCurrentSubaccountSummary();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();

  const closePositionMutationFn = useCallback(
    async (
      { productId, fractionToClose }: ClosePositionParams,
      context: ValidExecuteContext,
    ) => {
      const currentBalance = subaccountSummary?.balances.find(
        (balance) => balance.productId === productId,
      );

      if (
        !currentBalance ||
        currentBalance.amount.isZero() ||
        fractionToClose > 1
      ) {
        throw new Error(
          `Cannot close position due to zero balances: ${toPrintableObject(
            currentBalance?.amount,
          )}. Fraction requested: ${fractionToClose}`,
        );
      }

      const price = getMarketOrderExecutionPrice({
        // Closing a position will be opposite sign of existing position size
        isSell: currentBalance.amount.isPositive(),
        latestMarketPrices: latestMarketPrices?.[productId],
        marketSlippageFraction,
      });

      if (!price) {
        throw new Error('Cannot close position, no price available');
      }

      return placeOrderMutationFn(
        {
          price,
          amount: roundToString(
            currentBalance.amount.times(fractionToClose).negated(),
            0,
          ),
          productId,
          priceType: 'market',
          reduceOnly: true,
        },
        context,
      );
    },
    [
      latestMarketPrices,
      placeOrderMutationFn,
      marketSlippageFraction,
      subaccountSummary?.balances,
    ],
  );

  const mutationFn = useExecuteInValidContext(closePositionMutationFn);

  return useMutation({
    mutationFn,
    onSuccess(data, variables) {
      refetchPlaceEngineOrderRelatedQueries();
    },
    onError(error, variables) {
      logExecuteError('ClosePosition', error, variables);
    },
  });
}

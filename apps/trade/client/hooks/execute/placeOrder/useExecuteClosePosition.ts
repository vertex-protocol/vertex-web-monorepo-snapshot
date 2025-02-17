import { useMutation } from '@tanstack/react-query';
import { addDecimals, toPrintableObject } from '@vertex-protocol/utils';
import { usePlaceOrderMutationFn } from 'client/hooks/execute/placeOrder/usePlaceOrderMutationFn';
import { getMarketOrderExecutionPrice } from 'client/hooks/execute/util/getMarketOrderExecutionPrice';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { PLACE_ENGINE_ORDER_QUERY_KEYS } from 'client/hooks/execute/util/refetchQueryKeys';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { roundToString } from 'client/utils/rounding';
import { useCallback } from 'react';

interface ClosePositionParams {
  productId: number;
  isoSubaccountName: string | undefined;
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
  const { data: perpPositions } = usePerpPositions();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();

  const closePositionMutationFn = useCallback(
    async (
      { productId, fractionToClose, isoSubaccountName }: ClosePositionParams,
      context: ValidExecuteContext,
    ) => {
      const currentPosition = perpPositions?.find((pos) => {
        const matchesProductId = pos.productId === productId;
        const matchesMarginMode = pos.iso?.subaccountName === isoSubaccountName;

        return matchesMarginMode && matchesProductId;
      });

      if (
        !currentPosition ||
        currentPosition.amount.isZero() ||
        fractionToClose > 1
      ) {
        throw new Error(
          `Cannot close position due to zero balances: ${toPrintableObject(
            currentPosition?.amount,
          )}. Fraction requested: ${fractionToClose}`,
        );
      }

      const price = getMarketOrderExecutionPrice({
        // Closing a position will be opposite sign of existing position size
        isSell: currentPosition.amount.isPositive(),
        latestMarketPrices: latestMarketPrices?.[productId],
        marketSlippageFraction,
      });

      if (!price) {
        throw new Error('Cannot close position, no price available');
      }

      return placeOrderMutationFn(
        {
          subaccountName: currentPosition.iso?.subaccountName,
          price,
          amount: roundToString(
            addDecimals(currentPosition.amount)
              .times(fractionToClose)
              .negated(),
            0,
          ),
          productId,
          priceType: 'market',
          reduceOnly: true,
          iso: currentPosition.iso
            ? {
                borrowMargin: false,
                margin: 0,
              }
            : undefined,
        },
        context,
      );
    },
    [
      perpPositions,
      latestMarketPrices,
      marketSlippageFraction,
      placeOrderMutationFn,
    ],
  );

  const mutationFn = useExecuteInValidContext(closePositionMutationFn);

  return useMutation({
    mutationFn,
    onSuccess() {
      refetchPlaceEngineOrderRelatedQueries();
    },
    onError(error, variables) {
      logExecuteError('ClosePosition', error, variables);
    },
  });
}

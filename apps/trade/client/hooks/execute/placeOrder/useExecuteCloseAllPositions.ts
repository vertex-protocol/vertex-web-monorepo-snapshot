import { useMutation } from '@tanstack/react-query';
import { addDecimals } from '@vertex-protocol/utils';
import { useExecuteCancelReduceOnlyOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelReduceOnlyOrdersWithNotification';
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
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { useOrderSlippageSettings } from 'client/modules/trading/hooks/useOrderSlippageSettings';
import { delay } from 'client/utils/delay';
import { roundToString } from 'client/utils/rounding';
import { chunk } from 'lodash';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

export interface ExecuteCloseAllPositionsResult {
  numFailed: number;
  numPositionsToClose: number;
}

export function useExecuteCloseAllPositions() {
  const { trackEvent } = useAnalyticsContext();
  const { cancelReduceOnlyOrdersWithNotification } =
    useExecuteCancelReduceOnlyOrdersWithNotification();
  const { data: perpBalances } = usePerpPositions();
  const placeOrderMutationFn = usePlaceOrderMutationFn();
  const refetchPlaceEngineOrderRelatedQueries = useRefetchQueries(
    PLACE_ENGINE_ORDER_QUERY_KEYS,
  );
  const {
    savedSettings: { market: marketSlippageFraction },
  } = useOrderSlippageSettings();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();

  const closeAllPositionsMutationFn = useCallback(
    async (
      _: EmptyObject,
      context: ValidExecuteContext,
    ): Promise<ExecuteCloseAllPositionsResult> => {
      const positions = perpBalances?.filter(
        (balance) => !balance.amount.isZero(),
      );

      if (!positions?.length) {
        return {
          numFailed: 0,
          numPositionsToClose: 0,
        };
      }

      const closedProductIds: number[] = [];
      let numFailed = 0;

      // Chunk in batches of 3 to avoid rate limits
      for (const chunkedPositions of chunk(positions, 3)) {
        const batchPromises = chunkedPositions.map(async (position) => {
          const productId = position.productId;
          const positionAmount = position.amount;

          if (positionAmount.isZero()) {
            throw new Error(
              `Cannot close position due to zero balances: ${positionAmount.toString()}. `,
            );
          }

          const price = getMarketOrderExecutionPrice({
            // Closing a position will be opposite sign of existing position size
            isSell: positionAmount.isPositive(),
            latestMarketPrices: latestMarketPrices?.[productId],
            marketSlippageFraction,
          });

          if (!price) {
            throw new Error('Cannot close position, no price available');
          }

          await placeOrderMutationFn(
            {
              price,
              amount: roundToString(
                // Closing 100% of the position with close all positions feature
                addDecimals(positionAmount).negated(),
                0,
              ),
              productId,
              priceType: 'market',
              reduceOnly: true,
            },
            context,
          );

          return {
            productId,
          };
        });

        const batchedResults = await Promise.allSettled(batchPromises);

        batchedResults.forEach((result) => {
          if (result.status === 'fulfilled') {
            closedProductIds.push(result.value.productId);
          } else {
            numFailed++;
          }
        });

        await delay(1000);
      }

      // Cancel reduce only orders for closed positions
      cancelReduceOnlyOrdersWithNotification(closedProductIds);

      return { numFailed, numPositionsToClose: positions.length };
    },
    [
      perpBalances,
      cancelReduceOnlyOrdersWithNotification,
      latestMarketPrices,
      marketSlippageFraction,
      placeOrderMutationFn,
    ],
  );

  const mutationFn = useExecuteInValidContext(closeAllPositionsMutationFn);

  return useMutation({
    mutationFn,
    onSuccess(data) {
      refetchPlaceEngineOrderRelatedQueries();

      trackEvent({
        type: 'close_all_positions_placed',
        data: {
          numPositions: data.numPositionsToClose,
        },
      });
    },
    onError(error, variables) {
      logExecuteError('CloseAllPositions', error, variables);
    },
  });
}

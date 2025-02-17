import { useQueryClient } from '@tanstack/react-query';
import { isTriggerOrderNonce } from '@vertex-protocol/client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import {
  OPEN_ENGINE_ORDER_QUERY_KEYS,
  OPEN_TRIGGER_ORDER_QUERY_KEYS,
  ORDER_FILL_QUERY_KEYS,
} from 'client/hooks/execute/util/refetchQueryKeys';
import { useSubaccountLatestFillOrderEvents } from 'client/hooks/query/subaccount/useSubaccountLatestFillOrderEvents';
import { first } from 'lodash';
import { useEffect, useRef } from 'react';

/**
 * Similar logic to that of useSubaccountFillOrderEventEmitter.
 * Listens to order fills then refetches open order queries
 */
export function OrderFillQueryRefetchListener() {
  const queryClient = useQueryClient();
  const {
    currentSubaccount: { address, name, chainEnv },
  } = useSubaccountContext();
  const { data: latestFillOrderEvents } = useSubaccountLatestFillOrderEvents();

  // Undefined = not yet initialized
  // Null = no fills after initialization
  const lastFillOrderSubmissionIdx = useRef<string | null | undefined>(
    undefined,
  );

  // Reset on subaccount & chainenv changes
  useEffect(() => {
    lastFillOrderSubmissionIdx.current = undefined;
  }, [chainEnv, address, name]);

  useEffect(
    () => {
      if (latestFillOrderEvents == null) {
        return;
      }
      const events = latestFillOrderEvents.events;
      // No order fills
      if (events.length === 0) {
        lastFillOrderSubmissionIdx.current = null;
        return;
      }
      // Populate first on load without any action
      if (lastFillOrderSubmissionIdx.current === undefined) {
        lastFillOrderSubmissionIdx.current =
          first(events)?.submissionIndex ?? null;
        return;
      }

      let hasNewEngineOrderFills = false;
      let hasNewTriggerOrderFills = false;

      // Process events and determine what we need to refetch
      for (const event of events) {
        // Reached last emitted event
        if (event.submissionIndex === lastFillOrderSubmissionIdx.current) {
          break;
        }
        // Already know that we need to refetch
        if (hasNewEngineOrderFills && hasNewTriggerOrderFills) {
          break;
        }

        const isTrigger = isTriggerOrderNonce(event.order.nonce);
        if (isTrigger) {
          hasNewTriggerOrderFills = true;
        } else {
          hasNewEngineOrderFills = true;
        }
      }

      // Refetch as needed
      const refetchQueryKeys = (() => {
        const queryKeys: string[][] = [];

        if (hasNewEngineOrderFills || hasNewTriggerOrderFills) {
          queryKeys.push(...ORDER_FILL_QUERY_KEYS);
        }
        if (hasNewEngineOrderFills) {
          queryKeys.push(...OPEN_ENGINE_ORDER_QUERY_KEYS);
        }
        if (hasNewTriggerOrderFills) {
          queryKeys.push(...OPEN_TRIGGER_ORDER_QUERY_KEYS);
        }

        return queryKeys;
      })();

      refetchQueryKeys.forEach((queryKey) => {
        queryClient.refetchQueries({
          queryKey: queryKey,
          type: 'active',
        });
      });

      // Populate last processed filled order id
      lastFillOrderSubmissionIdx.current = events[0].submissionIndex;
    },
    // Fire only on data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latestFillOrderEvents],
  );

  return null;
}

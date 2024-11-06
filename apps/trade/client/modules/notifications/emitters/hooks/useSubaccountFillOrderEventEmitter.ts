import { isTriggerOrderNonce } from '@vertex-protocol/client';
import { toBigDecimal } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useSubaccountLatestFillOrderEvents } from 'client/hooks/query/subaccount/useSubaccountLatestFillOrderEvents';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { OrderFillNotificationData } from 'client/modules/notifications/types';
import { getOrderType } from 'client/modules/trading/utils/getOrderType';
import { calcOrderFillPrice } from 'client/utils/calcs/calcOrderFillPrice';
import { first } from 'lodash';
import { useEffect, useRef } from 'react';

export function useSubaccountFillOrderEventEmitter() {
  const {
    currentSubaccount: { address, name, chainEnv },
  } = useSubaccountContext();
  const { data: latestFillOrderEvents } = useSubaccountLatestFillOrderEvents();
  const { dispatchNotification } = useNotificationManagerContext();

  // Undefined = not yet initialized
  // Null = no fills after initialization
  const lastFillOrderSubmissionIdx = useRef<string | null | undefined>(
    undefined,
  );

  // Reset on subaccount & primary chain changes
  useEffect(() => {
    lastFillOrderSubmissionIdx.current = undefined;
  }, [address, name, chainEnv]);

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
      // Populate first on load, without firing notifications
      if (lastFillOrderSubmissionIdx.current === undefined) {
        lastFillOrderSubmissionIdx.current =
          first(events)?.submissionIndex ?? null;
        return;
      }

      const eventsToEmit: OrderFillNotificationData[] = [];
      // Only emit 1 event max per order per update
      // Because events are in reverse chronological order, the first encountered will have the latest information
      const orderDigestsToEmit = new Set<string>();

      for (const event of events) {
        // Reached last emitted event
        if (event.submissionIndex === lastFillOrderSubmissionIdx.current) {
          break;
        }

        // Skip if already emitted for this order
        if (orderDigestsToEmit.has(event.digest)) {
          continue;
        }

        orderDigestsToEmit.add(event.digest);
        const baseFilled = event.cumulativeBaseFilled;
        const isTrigger = isTriggerOrderNonce(event.order.nonce);

        eventsToEmit.push({
          isTrigger,
          digest: event.digest,
          orderType: getOrderType(event),
          fillPrice: calcOrderFillPrice(
            event.cumulativeQuoteFilled,
            event.cumulativeFee,
            event.cumulativeBaseFilled,
          ),
          newOrderFilledAmount: baseFilled,
          productId: event.productId,
          totalAmount: toBigDecimal(event.order.amount),
        });
      }
      // Reverse here so that the oldest events are dispatched first
      eventsToEmit.reverse().forEach((event) => {
        dispatchNotification({
          type: 'order_fill',
          data: event,
        });
      });

      // Populate last processed filled order id
      lastFillOrderSubmissionIdx.current = events[0].submissionIndex;
    },
    // Fire only on data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latestFillOrderEvents],
  );
}

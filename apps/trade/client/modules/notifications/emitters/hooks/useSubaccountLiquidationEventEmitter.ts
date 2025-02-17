import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useSubaccountPaginatedLiquidationEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedLiquidationEvents';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { LiquidationNotificationData } from 'client/modules/notifications/types';
import { useEffect, useRef } from 'react';

export function useSubaccountLiquidationEventEmitter() {
  const {
    currentSubaccount: { address, name, chainEnv },
  } = useSubaccountContext();
  const { data: paginatedLiquidations } =
    useSubaccountPaginatedLiquidationEvents({});
  const latestLiquidations = paginatedLiquidations?.pages[0];
  const { dispatchNotification } = useNotificationManagerContext();

  // Undefined = not yet initialized
  // Null = no liquidations after initialization
  const lastLiquidationSubmissionIdx = useRef<string | null | undefined>(
    undefined,
  );

  // Reset on subaccount chainenv changes
  useEffect(() => {
    lastLiquidationSubmissionIdx.current = undefined;
  }, [address, name, chainEnv]);

  useEffect(
    () => {
      if (latestLiquidations == null) {
        return;
      }
      const events = latestLiquidations.events;
      // No liquidations
      if (events.length === 0) {
        lastLiquidationSubmissionIdx.current = null;
        return;
      }
      // Populate first on load, without firing notifications
      if (lastLiquidationSubmissionIdx.current === undefined) {
        lastLiquidationSubmissionIdx.current =
          events[0].submissionIndex ?? null;
        return;
      }

      const eventsToEmit: LiquidationNotificationData[] = [];
      for (const event of events) {
        // Reached last emitted event
        if (event.submissionIndex === lastLiquidationSubmissionIdx.current) {
          break;
        }

        const isSpotLiquidated = !!event.spot;
        const isPerpLiquidated = !!event.perp;
        const isLpLiquidated = event.lps.length > 0;

        eventsToEmit.push({
          isSpotLiquidated,
          isPerpLiquidated,
          isLpLiquidated,
        });
      }

      // Reverse here so that the oldest events are dispatched first
      eventsToEmit.reverse().forEach((liquidation) => {
        // Dispatch liquidation notification
        dispatchNotification({
          type: 'liquidation',
          data: liquidation,
        });
      });

      // Populate last processed liquidation
      lastLiquidationSubmissionIdx.current = events[0].submissionIndex;
    },
    // Fire only on data changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latestLiquidations],
  );
}

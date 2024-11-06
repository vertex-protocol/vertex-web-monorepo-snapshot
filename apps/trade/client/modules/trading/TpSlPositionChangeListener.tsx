import { CancellableOrder } from 'client/hooks/execute/cancelOrder/types';
import {
  getInvalidTpSlOrdersToCancel,
  useExecuteCancelInvalidTpSlOrders,
} from 'client/hooks/execute/cancelOrder/useExecuteCancelInvalidTpSlOrders';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/useSubaccountSummary';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { delay } from 'client/utils/delay';
import { join } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

const NUM_RETRIES = 5;

/**
 * Cancels TP/SL orders when a position changes (e.g. closed, side change, order fill).
 */
export function TpSlPositionChangeListener() {
  const isSingleSignatureSession = useIsSingleSignatureSession({
    requireActive: true,
  });
  const { data: currentSubaccountSummary } = useSubaccountSummary();
  const { data: openTriggerOrders } = useSubaccountOpenTriggerOrders();

  // Since this hook can run while a cancel request is in flight, we use the following
  // state to ensure that only one request is in flight at a given time. We want a bit
  // of a delay between consecutive requests, so we cannot rely on mutation state here.
  const [isCancelling, setIsCancelling] = useState(false);

  const { mutate, failureCount } = useExecuteCancelInvalidTpSlOrders({
    // By default, react-query uses exponential backoff
    retry: NUM_RETRIES,
    onSettled() {
      // Inject a delay to avoid potential race conditions with order refetching
      delay(1000).then(() => {
        setIsCancelling(false);
      });
    },
  });

  const isRetrying = !!failureCount && failureCount < NUM_RETRIES;
  const shouldRunEffectSignal = useMemo(() => {
    /**
     * Conditions for running this effect
     * - Positions & trigger orders have loaded
     * - 1CT is enabled
     * - Not currently cancelling
     * - Not currently retrying a failed cancel request
     */
    if (
      !currentSubaccountSummary ||
      !openTriggerOrders ||
      !isSingleSignatureSession ||
      isCancelling ||
      isRetrying
    ) {
      return;
    }

    const ordersToCancel = getInvalidTpSlOrdersToCancel(
      currentSubaccountSummary.balances,
      openTriggerOrders,
    );

    if (!ordersToCancel.length) {
      return;
    }

    return getSignalId(ordersToCancel);
  }, [
    currentSubaccountSummary,
    isCancelling,
    isRetrying,
    isSingleSignatureSession,
    openTriggerOrders,
  ]);

  useEffect(() => {
    if (!shouldRunEffectSignal) {
      return;
    }

    setIsCancelling(true);
    mutate({});
  }, [mutate, shouldRunEffectSignal]);

  return null;
}

/**
 * Creates a deterministic signal ID based on the digests of the orders to cancel.
 */
function getSignalId(ordersToCancel: CancellableOrder[]) {
  return join(ordersToCancel.map((order) => order.digest).sort());
}

import { useSubaccountFillOrderEventEmitter } from 'client/modules/notifications/emitters/hooks/useSubaccountFillOrderEventEmitter';
import { useSubaccountLiquidationEventEmitter } from 'client/modules/notifications/emitters/hooks/useSubaccountLiquidationEventEmitter';
import { useSubaccountRiskEventEmitter } from 'client/modules/notifications/emitters/hooks/useSubaccountRiskEventEmitter';

/**
 * A persistent null component that listens for subaccount events and dispatches notifications
 */
export function SubaccountNotificationsEventEmitter() {
  useSubaccountFillOrderEventEmitter();
  useSubaccountRiskEventEmitter();
  useSubaccountLiquidationEventEmitter();
  return null;
}

import { BigDecimals } from '@vertex-protocol/utils';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { LIQUIDATION_RISK_WARNING_TOAST_ID } from 'client/modules/notifications/handlers/handleLiquidationRiskNotificationDispatch';
import { MARGIN_USAGE_WARNING_TOAST_ID } from 'client/modules/notifications/handlers/handleMarginUsageWarningNotificationDispatch';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { roundToDecimalPlaces } from 'client/utils/rounding';
import { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export function useSubaccountRiskEventEmitter() {
  const { data: portfolioOverview } = useSubaccountOverview();
  const { dispatchNotification } = useNotificationManagerContext();

  /*
   * Liquidation Risk trigger
   */
  const liquidationRiskFraction =
    portfolioOverview?.liquidationRiskFractionBounded;
  const hasTriggeredRisk = useRef<boolean>(false);

  useEffect(
    () => {
      // Only allow a notification to be dispatched if liquidation risk exists
      if (!liquidationRiskFraction) {
        return;
      }

      // Only allow a notification to be dispatched if liquidation risk reaches 80%
      // and has not been triggered previously
      if (liquidationRiskFraction.gte(0.8) && !hasTriggeredRisk.current) {
        dispatchNotification({
          type: 'liquidation_risk_warning',
          data: {
            liquidationRiskFraction: liquidationRiskFraction,
          },
        });
        hasTriggeredRisk.current = true;
        // This condition will dismiss the notification if the liquidation risk
        // fraction is less than 80% and the notification has been triggered
      } else if (liquidationRiskFraction.lt(0.8) && hasTriggeredRisk.current) {
        toast.dismiss(LIQUIDATION_RISK_WARNING_TOAST_ID);
        hasTriggeredRisk.current = false;
      }
    },
    // Fire only on liquidation risk changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [liquidationRiskFraction],
  );

  /*
   * Margin Usage trigger
   */

  // Rounding to 2 decimal places to avoid unnecessary notifications
  // and useEffect rerenders
  const roundedMarginUsageFraction = roundToDecimalPlaces(
    portfolioOverview?.marginUsageFractionBounded ?? BigDecimals.ZERO,
    2,
  ).toNumber();
  const hasTriggeredMargin = useRef<boolean>(false);

  useEffect(
    () => {
      // This condition will allow a notification to be dispatched if
      // subaccount initial margin reaches 100% and has not been triggered previously
      if (roundedMarginUsageFraction === 1 && !hasTriggeredMargin.current) {
        dispatchNotification({
          type: 'margin_usage_warning',
        });
        hasTriggeredMargin.current = true;
        // This condition will dismiss the notification if the margin usage
        // fraction is less than 100% and the notification has been triggered
      } else if (
        roundedMarginUsageFraction !== 1 &&
        hasTriggeredMargin.current
      ) {
        toast.dismiss(MARGIN_USAGE_WARNING_TOAST_ID);
        hasTriggeredMargin.current = false;
      }
    },
    // Fire only on margin usage changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roundedMarginUsageFraction],
  );
}

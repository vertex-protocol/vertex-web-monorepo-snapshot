import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BigDecimals } from 'client/utils/BigDecimals';
import { roundToDecimalPlaces } from 'client/utils/rounding';
import { useEffect, useRef } from 'react';

export function useSubaccountRiskEventEmitter() {
  const { data: portfolioOverview } = useDerivedSubaccountOverview();
  const { dispatchNotification } = useNotificationManagerContext();

  /*
   * Liquidation Risk trigger
   */
  const liquidationRiskFraction =
    portfolioOverview?.liquidationRiskFractionBounded;
  const hasTriggeredRisk = useRef<boolean>(false);

  useEffect(
    () => {
      // Only allow a notification to be dispatched once
      // if liquidation risk is valid and has increased
      if (!liquidationRiskFraction || hasTriggeredRisk.current) {
        return;
      }

      // Only allow a notification to be dispatched if liquidation risk reaches 80%
      if (liquidationRiskFraction.gte(0.8)) {
        dispatchNotification({
          type: 'liquidation_risk_warning',
          data: {
            liquidationRiskFraction: liquidationRiskFraction,
          },
        });
        hasTriggeredRisk.current = true;
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
      // Return early if margin notification usage has already triggered
      if (hasTriggeredMargin.current) {
        return;
      }

      // This condition will allow a notification to be dispatched if
      // subaccount initial margin reaches 100%
      if (roundedMarginUsageFraction === 1) {
        dispatchNotification({
          type: 'margin_usage_warning',
        });
        hasTriggeredMargin.current = true;
      }
    },
    // Fire only on margin usage changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roundedMarginUsageFraction],
  );
}

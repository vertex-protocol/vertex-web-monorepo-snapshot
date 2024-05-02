import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { Toast } from 'client/components/Toast/Toast';
import { ToastProps } from 'client/components/Toast/types';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { LiquidationRiskNotificationData } from '../../types';

export interface LiquidationRiskNotificationProps extends ToastProps {
  data: LiquidationRiskNotificationData;
}

export function LiquidationRiskNotification({
  data: { liquidationRiskFraction },
  visible,
  ttl,
  onDismiss,
}: LiquidationRiskNotificationProps) {
  const formattedLiquidationRiskFraction = formatNumber(
    liquidationRiskFraction,
    {
      formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
    },
  );

  const headerContent = (
    <div className="flex items-center gap-x-2">
      <span>Liquidation Risk - {formattedLiquidationRiskFraction}</span>
      <LiquidationRiskBar
        liquidationRiskFraction={liquidationRiskFraction}
        className="h-1.5 w-10 sm:h-2"
      />
    </div>
  );

  return (
    <Toast.Container visible={visible}>
      <Toast.Header onDismiss={onDismiss}>{headerContent}</Toast.Header>
      <Toast.Separator ttl={ttl} />
      <Toast.Body>
        Your liquidation risk has reached {formattedLiquidationRiskFraction}.
        Your account will become eligible for liquidation at 100%.
      </Toast.Body>
    </Toast.Container>
  );
}

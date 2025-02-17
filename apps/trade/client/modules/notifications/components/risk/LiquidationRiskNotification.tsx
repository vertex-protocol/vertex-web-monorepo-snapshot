import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { Toast } from 'client/components/Toast/Toast';
import { ToastProps } from 'client/components/Toast/types';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LiquidationRiskNotificationData } from 'client/modules/notifications/types';

export interface LiquidationRiskNotificationProps extends ToastProps {
  data: LiquidationRiskNotificationData;
}

export function LiquidationRiskNotification({
  data: { liquidationRiskFraction },
  visible,
  ttl,
  onDismiss,
}: LiquidationRiskNotificationProps) {
  const { show } = useDialog();
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

  const bodyContent = (
    <>
      <p>
        Your liquidation risk has reached {formattedLiquidationRiskFraction}.
        Your account will become eligible for liquidation at 100%.
      </p>
      <SecondaryButton
        size="xs"
        onClick={() => {
          show({ type: 'deposit', params: {} });
          onDismiss();
        }}
        className="text-text-secondary"
      >
        Deposit Funds
      </SecondaryButton>
    </>
  );

  return (
    <Toast.Container visible={visible}>
      <Toast.Header onDismiss={onDismiss}>{headerContent}</Toast.Header>
      <Toast.Separator ttl={ttl} />
      <Toast.Body className="flex flex-col items-start gap-y-4">
        {bodyContent}
      </Toast.Body>
    </Toast.Container>
  );
}

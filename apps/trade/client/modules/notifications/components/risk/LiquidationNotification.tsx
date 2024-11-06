import { Icons } from '@vertex-protocol/web-ui';
import { Toast } from 'client/components/Toast/Toast';
import { TOAST_HEADER_ICON_SIZE } from 'client/components/Toast/consts';
import { ToastProps } from 'client/components/Toast/types';
import { ROUTES } from 'client/modules/app/consts/routes';
import { LiquidationNotificationData } from 'client/modules/notifications/types';

export interface LiquidationNotificationProps extends ToastProps {
  data: LiquidationNotificationData;
}

export function LiquidationNotification({
  data,
  visible,
  ttl,
  onDismiss,
}: LiquidationNotificationProps) {
  const { isSpotLiquidated, isPerpLiquidated, isLpLiquidated } = data;

  // https://vertex-xwn1857.slack.com/archives/C03Q7BRV7NW/p1690683988305609
  // If only spot / perp / LP was liquidated: "Your spot balance was liquidated." / "Your perp position was liquidated." / "Your LP position was liquidated."
  // If both spot & perp were liquidated: "Your spot balance and perp position were liquidated."
  // If LP & spot & perp were liquidated: "Your spot balance, perp position, and LP position were liquidated."
  // There are other possible permutations but these serve as examples
  const liquidationMessage = (() => {
    const liquidationTypes: string[] = [];
    if (isSpotLiquidated) {
      liquidationTypes.push('spot balance');
    }
    if (isPerpLiquidated) {
      liquidationTypes.push('perp position');
    }
    if (isLpLiquidated) {
      liquidationTypes.push('LP position');
    }

    if (liquidationTypes.length === 1) {
      return `Your ${liquidationTypes[0]} was liquidated.`;
    }

    const lastType = liquidationTypes.pop(); // Removes the last item, this is preceded with "and"
    const joinedLiquidationTypes =
      liquidationTypes.join(', ') + ' and ' + lastType;

    return `Your ${joinedLiquidationTypes} were liquidated.`;
  })();

  const heading = (
    <div className="text-negative flex items-center gap-x-2">
      <Icons.Warning size={TOAST_HEADER_ICON_SIZE} />
      Liquidation Event
    </div>
  );

  return (
    <Toast.Container className="border-negative" visible={visible}>
      <Toast.Header onDismiss={onDismiss}>{heading}</Toast.Header>
      <Toast.Separator ttl={ttl} className="bg-negative-muted" />
      <Toast.Body className="flex flex-col gap-y-3">
        <p>{liquidationMessage}</p>
        <Toast.FooterLink href={ROUTES.portfolio.history}>
          View History
        </Toast.FooterLink>
      </Toast.Body>
    </Toast.Container>
  );
}

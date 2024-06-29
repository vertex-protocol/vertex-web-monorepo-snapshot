import { joinClassNames } from '@vertex-protocol/web-common';
import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';
import { ClosePositionNotificationData } from 'client/modules/notifications/types';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { signDependentValue } from 'client/utils/signDependentValue';
import { OrderSuccessIcon } from '../OrderSuccessIcon';

interface ClosePositionNotificationProps extends ToastProps {
  data: ClosePositionNotificationData['closePositionParams'];
}

export function ClosePositionSuccessNotification({
  data,
  onDismiss,
  visible,
  ttl,
}: ClosePositionNotificationProps) {
  const { metadata, amount, fraction } = data;
  const closeAmount = formatNumber(amount.times(fraction).abs(), {
    formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
  });

  const percentageAmount = formatNumber(fraction, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });
  const side = amount.isNegative() ? 'SHORT' : 'LONG';

  const bodyContent = (
    <div>
      You have placed an order to close{' '}
      <span className="text-text-primary">
        {closeAmount} {metadata.symbol}
      </span>{' '}
      ({percentageAmount}) of your{' '}
      <span className="text-text-primary">{metadata.marketName}</span>{' '}
      <span
        className={joinClassNames(
          'uppercase',
          signDependentValue(amount, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: undefined,
          }),
        )}
      >
        {side}
      </span>{' '}
      position.
    </div>
  );

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.SectionedHeader
        variant="success"
        leftLabel="Market Close"
        rightLabel="Placed"
        icon={OrderSuccessIcon}
        onDismiss={onDismiss}
      />
      <ActionToast.Separator variant="success" ttl={ttl} />
      <ActionToast.Body variant="success">{bodyContent}</ActionToast.Body>
    </ActionToast.Container>
  );
}

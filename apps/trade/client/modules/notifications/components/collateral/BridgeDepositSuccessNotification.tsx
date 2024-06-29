import { BigDecimalish } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { Toast } from 'client/components/Toast/Toast';
import { ToastProps } from 'client/components/Toast/types';

interface BridgeDepositSuccessNotificationProps extends ToastProps {
  amount: BigDecimalish;
  symbol: string;
  chainName: string;
  txHash: string;
}

export function BridgeDepositSuccessNotification({
  amount,
  symbol,
  chainName,
  txHash,
  visible,
  ttl,
  onDismiss,
}: BridgeDepositSuccessNotificationProps) {
  const axelarScanUrl = `https://axelarscan.io/gmp/${txHash}`;

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="success" onDismiss={onDismiss}>
        Cross-Chain Deposit Submitted
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="success" ttl={ttl} />
      <ActionToast.Body variant="success" className="flex flex-col gap-y-1.5">
        <p>
          Your cross-chain deposit of{' '}
          <span className="text-text-primary">
            {formatNumber(amount, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })}{' '}
            {symbol}{' '}
          </span>{' '}
          from <span className="text-text-primary">{chainName}</span> has been
          submitted.
        </p>
        <Toast.FooterLink external href={axelarScanUrl}>
          Track Status
        </Toast.FooterLink>
      </ActionToast.Body>
    </ActionToast.Container>
  );
}

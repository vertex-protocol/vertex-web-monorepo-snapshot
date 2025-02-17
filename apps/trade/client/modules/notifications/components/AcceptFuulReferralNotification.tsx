import { SecondaryButton } from '@vertex-protocol/web-ui';
import { IdentityIcon } from 'client/components/Icons/IdentityIcon';
import { Toast } from 'client/components/Toast/Toast';
import { ToastProps } from 'client/components/Toast/types';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { formatFuulReferralCode } from 'client/modules/referrals/fuul/formatFuulReferralCode';
import Link from 'next/link';

interface Props extends ToastProps {
  referralCode: string;
}

export function AcceptFuulReferralNotification({
  visible,
  referralCode,
  ttl,
  onDismiss,
}: Props) {
  const isConnected = useIsConnected();
  const { show } = useDialog();

  const ctaButton = isConnected ? (
    <SecondaryButton
      size="sm"
      as={Link}
      href={ROUTES.referrals}
      onClick={onDismiss}
    >
      Go to Referrals
    </SecondaryButton>
  ) : (
    <SecondaryButton
      size="sm"
      onClick={() => show({ type: 'connect', params: {} })}
    >
      Connect Wallet
    </SecondaryButton>
  );

  return (
    <Toast.Container visible={visible}>
      <Toast.Header className="flex gap-x-1.5" onDismiss={onDismiss}>
        <IdentityIcon size={22} identifier={referralCode} />
        You&apos;ve Been Referred!
      </Toast.Header>
      <Toast.Separator ttl={ttl} />
      <Toast.Body className="flex flex-col items-start gap-y-2">
        <p>
          <span className="text-text-primary">
            {formatFuulReferralCode(referralCode)}
          </span>{' '}
          referred you. Confirm your referral to get benefits and earn rewards.
        </p>
        {ctaButton}
      </Toast.Body>
    </Toast.Container>
  );
}

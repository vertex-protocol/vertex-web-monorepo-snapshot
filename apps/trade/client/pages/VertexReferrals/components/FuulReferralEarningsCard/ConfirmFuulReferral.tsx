import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { IdentityIcon } from 'client/components/Icons/IdentityIcon';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { formatFuulReferralCode } from 'client/modules/referrals/fuul/formatFuulReferralCode';

interface Props extends WithClassnames {
  referrerForAddress: string | null | undefined;
  referralCodeForSession: string | undefined;
  disableConfirmReferral: boolean;
}

export function ConfirmFuulReferral({
  referrerForAddress,
  referralCodeForSession,
  disableConfirmReferral,
  className,
}: Props) {
  const { show } = useDialog();

  // User was not referred by another trader
  const hasNoReferrer = !referralCodeForSession && referrerForAddress === null;

  const referralCode = referralCodeForSession ?? referrerForAddress;
  if (referralCode) {
    return (
      <div
        className={joinClassNames(
          'flex flex-col gap-3',
          'sm:flex-row sm:items-end sm:justify-between',
          'text-sm',
          className,
        )}
      >
        <div className="flex items-center gap-x-1.5">
          <IdentityIcon size={22} identifier={referralCode} />
          <span>
            <span className="text-text-primary break-all">
              {formatFuulReferralCode(referralCode)}
            </span>{' '}
            referred you.
          </span>
        </div>
        {referralCodeForSession && (
          <SecondaryButton
            onClick={() => show({ type: 'confirm_fuul_referral', params: {} })}
            disabled={disableConfirmReferral}
          >
            Confirm Referral
          </SecondaryButton>
        )}
      </div>
    );
  }

  if (hasNoReferrer) {
    return (
      <p className={joinClassNames('text-text-tertiary text-sm', className)}>
        If you were referred by another trader, you’ll be able to see and claim
        available rebates here.
      </p>
    );
  }

  // Data not available, show nothing
  return null;
}

import { PrimaryChain } from '@vertex-protocol/react-client';
import {
  LinkButton,
  PrimaryButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

interface Props {
  disableClaim: boolean;
  rewardsChain: PrimaryChain;
}

export function ClaimFuulEarnings({ disableClaim, rewardsChain }: Props) {
  const { show } = useDialog();

  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain,
    requiredConnectedChain: rewardsChain,
  });

  const ctaButton = userStateErrorButtonProps ? (
    <PrimaryButton {...userStateErrorButtonProps} />
  ) : (
    <SecondaryButton
      disabled={disableClaim}
      onClick={() => {
        show({ type: 'claim_fuul_referral_earnings', params: {} });
      }}
    >
      Claim Earnings
    </SecondaryButton>
  );

  return (
    <div className="flex flex-col gap-y-3">
      {ctaButton}
      <div className="text-text-tertiary text-sm">
        Referral commissions and rebates are only tracked across Arbitrum and
        Mantle. Rewards can be claimed on Arbitrum.{' '}
        <LinkButton
          as={Link}
          colorVariant="primary"
          href={VERTEX_SPECIFIC_LINKS.fuulReferralsDocs}
          external
        >
          Learn more
        </LinkButton>
      </div>
    </div>
  );
}

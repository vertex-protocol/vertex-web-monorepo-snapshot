import { PrimaryChain } from '@vertex-protocol/react-client';
import { PrimaryButton, SecondaryButton } from '@vertex-protocol/web-ui';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { WarningPanel } from 'client/components/WarningPanel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';

interface Props {
  disableClaim: boolean;
  rewardsChain: PrimaryChain;
}

export function ClaimFuulEarnings({ disableClaim, rewardsChain }: Props) {
  const { show } = useDialog();
  const { isFuulVolumeTrackingEnabled } = useEnabledFeatures();

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
      {!isFuulVolumeTrackingEnabled && (
        <WarningPanel title="Unsupported Chain">
          You can still confirm your referral, but volume traded on this chain
          will not count towards rewards.
        </WarningPanel>
      )}
    </div>
  );
}

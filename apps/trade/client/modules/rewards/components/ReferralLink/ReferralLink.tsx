import { joinClassNames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { Icons, PrimaryButton } from '@vertex-protocol/web-ui';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useTweetLink } from 'client/hooks/util/useTweetLink';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ReferralLinkBar } from 'client/modules/rewards/components/ReferralLink/ReferralLinkBar';
import Link from 'next/link';

interface Props {
  referralLink: string | undefined;
  tweetText: string;
}

export function ReferralLink({ referralLink, tweetText }: Props) {
  const { show } = useDialog();

  const tweetLink = useTweetLink(tweetText);
  const { connectionStatus } = useEVMContext();
  const userActionState = useUserActionState();

  const isConnected = connectionStatus.type === 'connected';
  const hasReferralLink = !!referralLink;
  const requiresFirstDeposit = useRequiresInitialDeposit();

  // Static min-width to prevent layout shift based on content - on mobile this is full width
  const ctaButtonWidth = 'min-w-32';

  const ctaButtonContent = requiresFirstDeposit ? (
    <PrimaryButton
      size="lg"
      className={ctaButtonWidth}
      disabled={userActionState === 'block_all'}
      onClick={() => show({ type: 'deposit', params: {} })}
    >
      Deposit
    </PrimaryButton>
  ) : (
    <PrimaryButton
      size="lg"
      as={Link}
      href={tweetLink}
      external
      startIcon={<Icons.BsTwitterX />}
      className={ctaButtonWidth}
      disabled={!hasReferralLink}
    >
      Share
    </PrimaryButton>
  );

  return (
    <div
      className={joinClassNames(
        'flex gap-x-3',
        // Mobile specific styles
        'flex-col gap-y-3',
        // Large screen specific styles
        'sm:flex-row',
      )}
    >
      <ReferralLinkBar
        referralLink={referralLink}
        isConnected={isConnected}
        requiresFirstDeposit={requiresFirstDeposit}
        disabled={!hasReferralLink}
        className="sm:flex-1"
      />
      {ctaButtonContent}
    </div>
  );
}

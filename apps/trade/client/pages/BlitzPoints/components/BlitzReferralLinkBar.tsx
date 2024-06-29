import { useEVMContext } from '@vertex-protocol/react-client';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useReferralLink } from 'client/modules/referrals/hooks/useReferralLink';
import { ReferralLinkBar } from 'client/modules/rewards/components/ReferralLink/ReferralLinkBar';

interface Props {
  referralCode: string | null | undefined;
}

export function BlitzReferralLinkBar({ referralCode }: Props) {
  const { baseUrlWithQueryParam, referralLink } = useReferralLink({
    referralCode,
  });
  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';
  const requiresFirstDeposit = useRequiresInitialDeposit();

  return (
    <ReferralLinkBar
      className="shadow-elevation-referrals-bar ring-accent ring-1"
      isConnected={isConnected}
      requiresFirstDeposit={requiresFirstDeposit}
      referralCode={referralCode}
      baseUrlWithQueryParam={baseUrlWithQueryParam}
      socialShareText={`Trade on Blitz and earn points. Trade spot and perpetuals on a blazing-fast orderbook DEX.\nGet in here: ${referralLink}`}
    />
  );
}

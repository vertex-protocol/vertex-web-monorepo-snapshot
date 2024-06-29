import { WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useReferralLink } from 'client/modules/referrals/hooks/useReferralLink';
import { ReferralLinkBar } from 'client/modules/rewards/components/ReferralLink/ReferralLinkBar';
import { Token } from 'common/productMetadata/types';

interface Props extends WithClassnames {
  referralCode: string | null | undefined;
  payoutToken: Token;
}

export function VertexReferralLinkBar({
  referralCode,
  payoutToken,
  className,
}: Props) {
  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';

  const { baseUrlWithQueryParam, referralLink } = useReferralLink({
    referralCode,
  });

  return (
    <ReferralLinkBar
      className={className}
      isConnected={isConnected}
      // Fuul does not require a first deposit
      requiresFirstDeposit={false}
      referralCode={referralCode}
      baseUrlWithQueryParam={baseUrlWithQueryParam}
      socialShareText={`Trade on Vertex and earn ${payoutToken.symbol}. Trade spot and perpetuals on a blazing-fast orderbook DEX.\nGet in here: ${referralLink}`}
    />
  );
}

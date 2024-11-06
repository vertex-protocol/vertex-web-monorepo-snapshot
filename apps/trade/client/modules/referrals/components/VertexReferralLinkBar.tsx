'use client';

import { WithClassnames } from '@vertex-protocol/web-common';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ReferralLinkBar } from 'client/modules/referrals/components/ReferralLink/ReferralLinkBar';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { useAddressReferralCode } from 'client/modules/referrals/hooks/query/useAddressReferralCode';
import { useReferralLink } from 'client/modules/referrals/hooks/useReferralLink';

export function VertexReferralLinkBar({ className }: WithClassnames) {
  const isConnected = useIsConnected();
  const { payoutToken } = useFuulReferralsContext();
  const { data: referralCodeData } = useAddressReferralCode();
  const { baseUrlWithQueryParam, referralLink } = useReferralLink({
    referralCode: referralCodeData?.referralCode,
  });

  return (
    <ReferralLinkBar
      className={className}
      isConnected={isConnected}
      // Fuul does not require a first deposit
      requiresFirstDeposit={false}
      referralCode={referralCodeData?.referralCode}
      baseUrlWithQueryParam={baseUrlWithQueryParam}
      socialShareText={`Trade on Vertex and earn ${payoutToken.symbol}. Trade spot and perpetuals on a blazing-fast orderbook DEX.\nGet in here: ${referralLink}`}
    />
  );
}

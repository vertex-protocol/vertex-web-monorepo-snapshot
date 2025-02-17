'use client';

import { WithClassnames } from '@vertex-protocol/web-common';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ReferralLinkBar } from 'client/modules/referrals/ReferralLinkBar';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { useAddressFuulReferralCode } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulReferralCode';
import { useReferralLink } from 'client/modules/referrals/useReferralLink';

export function FuulReferralLinkBar({ className }: WithClassnames) {
  const isConnected = useIsConnected();
  const { payoutToken } = useFuulReferralsContext();
  const { data: referralCodeData } = useAddressFuulReferralCode();
  const { baseUrlWithQueryParam, referralLink } = useReferralLink({
    referralCode: referralCodeData?.referralCode,
    isFuul: true,
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

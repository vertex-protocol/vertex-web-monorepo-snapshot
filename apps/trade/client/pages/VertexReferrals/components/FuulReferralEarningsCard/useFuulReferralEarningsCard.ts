import { BigDecimals, removeDecimals } from '@vertex-protocol/client';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { useAddressFuulRefereeRewards } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulRefereeRewards';
import { useAddressFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulReferralRewards';
import { useAddressOnChainFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/useAddressOnChainFuulReferralRewards';
import { useFuulReferrerForAddress } from 'client/modules/referrals/fuul/hooks/query/useFuulReferrerForAddress';
import { useMemo } from 'react';

export function useFuulReferralEarningsCard() {
  const isConnected = useIsConnected();

  const { data: referrerForAddressData } = useFuulReferrerForAddress();
  const { data: refereeRewardsData } = useAddressFuulRefereeRewards();
  const { data: referralRewardsData } = useAddressFuulReferralRewards();
  const { data: onChainReferralRewardsData } =
    useAddressOnChainFuulReferralRewards();

  const { referralCodeForSession, payoutToken, rewardsChain } =
    useFuulReferralsContext();

  const onChainReferralRewards = useMemo(() => {
    if (!onChainReferralRewardsData) {
      return;
    }

    const claimableRewardsUsdc = removeDecimals(
      onChainReferralRewardsData?.availableToClaim,
      payoutToken.tokenDecimals,
    );
    const claimedRewardsUsdc = removeDecimals(
      onChainReferralRewardsData?.claimed,
      payoutToken.tokenDecimals,
    );

    return {
      claimableRewardsUsdc,
      claimedRewardsUsdc,
    };
  }, [onChainReferralRewardsData, payoutToken.tokenDecimals]);

  // Total earned as a referee = rebates earned
  const rebatesEarnedUsdc = refereeRewardsData?.totalEarnedUsdc;
  // Total earned as a referrer = commissions earned
  const commissionsEarnedUsdc = referralRewardsData?.totalEarnedUsdc;

  const totalRewardsEarnedUsdc = useMemo(() => {
    return (rebatesEarnedUsdc ?? BigDecimals.ZERO).plus(
      commissionsEarnedUsdc ?? BigDecimals.ZERO,
    );
  }, [commissionsEarnedUsdc, rebatesEarnedUsdc]);

  return {
    referralCodeForSession,
    referrerForAddress: referrerForAddressData,
    totalRewardsEarnedUsdc,
    commissionsEarnedUsdc,
    rebatesEarnedUsdc,
    payoutToken,
    rewardsChain,
    claimableRewardsUsdc: onChainReferralRewards?.claimableRewardsUsdc,
    claimedRewardsUsdc: onChainReferralRewards?.claimedRewardsUsdc,
    disableClaim:
      !isConnected ||
      !onChainReferralRewardsData?.availableToClaim ||
      onChainReferralRewardsData?.availableToClaim.isZero(),
    disableConfirmReferral: !isConnected,
  };
}

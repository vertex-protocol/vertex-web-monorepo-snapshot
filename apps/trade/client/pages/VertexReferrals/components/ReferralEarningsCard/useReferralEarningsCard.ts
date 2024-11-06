import { BigDecimals, removeDecimals } from '@vertex-protocol/client';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { useAddressOnChainReferralRewards } from 'client/modules/referrals/hooks/query/useAddressOnChainReferralRewards';
import { useAddressRefereeRewards } from 'client/modules/referrals/hooks/query/useAddressRefereeRewards';
import { useAddressReferralRewards } from 'client/modules/referrals/hooks/query/useAddressReferralRewards';
import { useReferrerForAddress } from 'client/modules/referrals/hooks/query/useReferrerForAddress';
import { useMemo } from 'react';

export function useReferralEarningsCard() {
  const isConnected = useIsConnected();

  const { data: referrerForAddressData } = useReferrerForAddress();
  const { data: refereeRewardsData } = useAddressRefereeRewards();
  const { data: referralRewardsData } = useAddressReferralRewards();
  const { data: onChainReferralRewardsData } =
    useAddressOnChainReferralRewards();

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

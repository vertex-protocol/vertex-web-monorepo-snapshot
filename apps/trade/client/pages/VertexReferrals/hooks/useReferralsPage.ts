import { removeDecimals } from '@vertex-protocol/client';
import { BigDecimals } from '@vertex-protocol/utils';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { useAddressOnChainReferralRewards } from 'client/modules/referrals/hooks/query/useAddressOnChainReferralRewards';
import { useAddressRefereeRewards } from 'client/modules/referrals/hooks/query/useAddressRefereeRewards';
import { useAddressReferralCode } from 'client/modules/referrals/hooks/query/useAddressReferralCode';
import { useAddressReferralRewards } from 'client/modules/referrals/hooks/query/useAddressReferralRewards';
import { useReferrerForAddress } from 'client/modules/referrals/hooks/query/useReferrerForAddress';
import { useMemo } from 'react';

export function useReferralsPage() {
  const userActionState = useUserActionState();
  const { connectionStatus } = useEVMContext();

  const {
    referralCodeForSession,
    payoutToken,
    rewardsChainEnv,
    volumeAmountSymbol,
  } = useFuulReferralsContext();

  const { data: referrerForAddressData } = useReferrerForAddress();
  const { data: referralCodeData } = useAddressReferralCode();
  const { data: refereeRewardsData } = useAddressRefereeRewards();
  const { data: referralRewardsData } = useAddressReferralRewards();
  const { data: onChainReferralRewardsData } =
    useAddressOnChainReferralRewards();

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
    volumeAmountSymbol,
    payoutToken,
    referralCodeForSession,
    rewardsChainEnv,
    // On chain data
    claimableRewardsUsdc: onChainReferralRewards?.claimableRewardsUsdc,
    claimedRewardsUsdc: onChainReferralRewards?.claimedRewardsUsdc,
    // Fuul backend data
    rank: referralRewardsData?.rank,
    tier: referralRewardsData?.tier,
    commissionsEarnedUsdc,
    numReferredUsers: referralRewardsData?.numReferredUsers,
    referredVolumeUsdc: referralRewardsData?.referredVolumeUsdc,
    rebatesEarnedUsdc,
    referrerForAddress: referrerForAddressData,
    referralCode: referralCodeData?.referralCode,
    totalRewardsEarnedUsdc,
    // Action state
    disableClaim:
      userActionState === 'block_all' ||
      !onChainReferralRewardsData?.availableToClaim ||
      onChainReferralRewardsData?.availableToClaim.isZero(),
    disableCustomizeLink: userActionState === 'block_all',
    // Can confirm referral even on the wrong chain
    disableConfirmReferral: connectionStatus.type !== 'connected',
  };
}

import {
  IndexerRewardsEpoch,
  LBA_AIRDROP_EPOCH,
} from '@vertex-protocol/client';
import {
  BigDecimal,
  sumBigDecimalBy,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { AccountTokenClaimStateData } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';

import { VrtxRewardEpoch } from 'client/modules/rewards/types';
import { BigDecimals } from 'client/utils/BigDecimals';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { safeDiv } from 'client/utils/safeDiv';
import { get } from 'lodash';

interface Params {
  nowInMillis: number;
  indexerRewardEpoch: IndexerRewardsEpoch;
  accountTokenClaimState: AccountTokenClaimStateData;
  tokenClaimDeadlines: BigDecimal[];
  vrtxTokenDecimals: number;
}

export function toVrtxRewardEpoch({
  nowInMillis,
  indexerRewardEpoch,
  accountTokenClaimState,
  tokenClaimDeadlines,
  vrtxTokenDecimals,
}: Params): VrtxRewardEpoch {
  // Epoch times in millis
  const periodMillis = indexerRewardEpoch.period.multipliedBy(1000);
  const from = indexerRewardEpoch.startTime.multipliedBy(1000);
  const to = from.plus(periodMillis);

  // Total trading rewards (maker + taker) for all accounts in this epoch
  const totalTradingRewards = sumBigDecimalBy(
    indexerRewardEpoch.globalRewards,
    ({ makerTokens, takerTokens }) => makerTokens.plus(takerTokens),
  ).plus(
    // Add 2.5M tokens for the first 6 epochs from token uplifts, which isn't in the backend response
    indexerRewardEpoch.epoch <= 6 ? 2.5e6 : 0,
  );

  // Distribution adjustment - scale rewards to the amount of time elapsed within the epoch
  // (use min to account for past epochs, as now - from can be greater than the epoch period)
  const distributionTimeAdjustment = BigDecimal.min(
    toBigDecimal(nowInMillis).minus(from).div(periodMillis),
    BigDecimals.ONE,
  );

  // Calculate totals for subaccount
  let totalSubaccountTradingRewards = BigDecimals.ZERO;
  let totalSubaccountReferralRewards = BigDecimals.ZERO;
  let totalSubaccountFees = BigDecimals.ZERO;

  indexerRewardEpoch.addressRewards.forEach((rewardsForProduct) => {
    totalSubaccountTradingRewards = totalSubaccountTradingRewards.plus(
      rewardsForProduct.makerTokens.plus(rewardsForProduct.takerTokens),
    );
    totalSubaccountReferralRewards = totalSubaccountReferralRewards.plus(
      rewardsForProduct.takerReferralTokens,
    );
    totalSubaccountFees = totalSubaccountFees.plus(rewardsForProduct.takerFee);
  });

  // % share of the subaccount rewards in the epoch
  const subaccountShareFrac = safeDiv(
    totalSubaccountTradingRewards,
    totalTradingRewards,
  );

  const epochNumber = indexerRewardEpoch.epoch;

  const subaccountTokenTotalClaimed = removeDecimals(
    get(accountTokenClaimState.claimedPerEpoch, epochNumber, undefined),
    vrtxTokenDecimals,
  );
  const subaccountTokenTotalEarned = removeDecimals(
    get(accountTokenClaimState.totalClaimablePerEpoch, epochNumber, undefined),
    vrtxTokenDecimals,
  );
  const tokenClaimDeadline = get(
    tokenClaimDeadlines,
    Math.max(LBA_AIRDROP_EPOCH, epochNumber),
    undefined,
  );

  return {
    epochNumber,
    epochIntervalMillis: {
      from: from.toNumber(),
      to: to.toNumber(),
    },
    subaccountShareFrac,
    subaccountFees: totalSubaccountFees,
    totalRewards: totalTradingRewards,
    subaccountRewards: {
      // Estimated rewards are scaled by time adjustment
      trading: totalSubaccountTradingRewards.multipliedBy(
        distributionTimeAdjustment,
      ),
      referrals: totalSubaccountReferralRewards.multipliedBy(
        distributionTimeAdjustment,
      ),
    },
    numEligibleAddresses: indexerRewardEpoch.numEligibleAddresses,
    subaccountTokenClaim: {
      claimed: subaccountTokenTotalClaimed,
      totalEarned: subaccountTokenTotalEarned,
      claimDeadlineMillis:
        tokenClaimDeadline != null
          ? Number(tokenClaimDeadline) * 1000
          : undefined,
    },
  };
}

import { BigDecimal, calcLpTokenValue } from '@vertex-protocol/client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useTokenLaunchStage } from 'client/modules/rewards/hooks/useTokenLaunchStage';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { isBefore } from 'date-fns';
import { now } from 'lodash';
import { useMemo } from 'react';

export interface LbaPositionTableItem {
  suppliedAmount: {
    vrtx: BigDecimal;
    usdc: BigDecimal;
  };
  lpBalanceValuesUsd: {
    locked: BigDecimal;
    unlocked: BigDecimal;
  };
  lpVestTimestampMillis: number;
  lbaRewardsClaimed: BigDecimal;
  lbaRewardsEarned: BigDecimal;
  totalLpBalance: BigDecimal;
}

export function useLbaPositionTable() {
  const { primaryQuoteToken, protocolToken, protocolTokenProductId } =
    useVertexMetadataContext();
  const { data: accountState, isLoading: isLoadingAccountState } =
    useAccountLbaState();
  const { data: tokenClaimState, isLoading: isLoadingTokenClaimState } =
    useAccountTokenClaimState();
  const {
    data: tokenLaunchStageData,
    isLoading: isLoadingTokenLaunchStageData,
  } = useTokenLaunchStage();
  const { data: vrtxMarket } = useMarket({
    productId: protocolTokenProductId,
  });
  const quotePriceUsd = useQuotePriceUsd();

  const data = useMemo((): LbaPositionTableItem[] | undefined => {
    if (
      !accountState ||
      !tokenClaimState ||
      !tokenLaunchStageData ||
      !vrtxMarket
    ) {
      return;
    }
    const depositedUsdc = removeDecimals(
      accountState.depositedUsdc,
      primaryQuoteToken.tokenDecimals,
    );
    const depositedVrtx = removeDecimals(
      accountState.depositedVrtx,
      protocolToken.tokenDecimals,
    );
    const lockedLpBalance = removeDecimals(
      accountState.lockedLpBalance,
      protocolToken.tokenDecimals,
    );
    const unlockedLpBalance = removeDecimals(
      accountState.withdrawableLpBalance,
      protocolToken.tokenDecimals,
    );
    const totalLpBalance = lockedLpBalance.plus(unlockedLpBalance);

    const lpBalanceValuesUsd = (() => {
      const lpTokenValueUsd = calcLpTokenValue(vrtxMarket.product).multipliedBy(
        quotePriceUsd,
      );
      return {
        locked: lpTokenValueUsd.multipliedBy(lockedLpBalance),
        unlocked: lpTokenValueUsd.multipliedBy(unlockedLpBalance),
      };
    })();

    const lbaRewardsEarned = removeDecimals(
      tokenClaimState.claimableLbaRewards.plus(
        tokenClaimState.claimedLbaRewards,
      ),
      protocolToken.tokenDecimals,
    );
    const lbaRewardsClaimed = removeDecimals(
      tokenClaimState.claimedLbaRewards,
      protocolToken.tokenDecimals,
    );

    // If the current time is before the LP vesting start time, use the LP vesting start time.
    // Otherwise, use the LP vesting end time.
    const lpVestTimestampMillis = isBefore(
      now(),
      tokenLaunchStageData.stageConfigTimestampsMillis.lpVestStartTime,
    )
      ? tokenLaunchStageData.stageConfigTimestampsMillis.lpVestStartTime
      : tokenLaunchStageData.stageConfigTimestampsMillis.lpVestEndTime;

    return [
      {
        lpBalanceValuesUsd,
        totalLpBalance,
        lbaRewardsClaimed,
        lbaRewardsEarned,
        suppliedAmount: {
          vrtx: depositedVrtx,
          usdc: depositedUsdc,
        },
        lpVestTimestampMillis,
      },
    ];
  }, [
    accountState,
    vrtxMarket,
    tokenLaunchStageData,
    quotePriceUsd,
    tokenClaimState,
    primaryQuoteToken,
    protocolToken,
  ]);

  return {
    tableData: data,
    tokenLaunchStage: tokenLaunchStageData?.stage,
    isLoading:
      isLoadingAccountState ||
      isLoadingTokenLaunchStageData ||
      isLoadingTokenClaimState,
  };
}

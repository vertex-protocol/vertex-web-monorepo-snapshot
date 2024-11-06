import { BigDecimal, calcLpTokenValue } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useTokenLaunchStage } from 'client/modules/rewards/hooks/useTokenLaunchStage';
import { removeDecimals } from '@vertex-protocol/utils';
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
  const { primaryQuoteToken, protocolTokenMetadata } =
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
    productId: protocolTokenMetadata.productId,
  });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

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
      protocolTokenMetadata.token.tokenDecimals,
    );
    const lockedLpBalance = removeDecimals(
      accountState.lockedLpBalance,
      protocolTokenMetadata.token.tokenDecimals,
    );
    const unlockedLpBalance = removeDecimals(
      accountState.withdrawableLpBalance,
      protocolTokenMetadata.token.tokenDecimals,
    );
    const totalLpBalance = lockedLpBalance.plus(unlockedLpBalance);

    const lpBalanceValuesUsd = (() => {
      const lpTokenValueUsd = calcLpTokenValue(vrtxMarket.product).multipliedBy(
        primaryQuotePriceUsd,
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
      protocolTokenMetadata.token.tokenDecimals,
    );
    const lbaRewardsClaimed = removeDecimals(
      tokenClaimState.claimedLbaRewards,
      protocolTokenMetadata.token.tokenDecimals,
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
    primaryQuotePriceUsd,
    tokenClaimState,
    primaryQuoteToken,
    protocolTokenMetadata,
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

import { calcLpTokenValue } from '@vertex-protocol/client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useClaimLbaRewards } from 'client/modules/rewards/hooks/useClaimLbaRewards';
import { useTokenLaunchStage } from 'client/modules/rewards/hooks/useTokenLaunchStage';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { useMemo } from 'react';

export function useLbaPositionSummaryCard() {
  const { protocolTokenProductId, protocolToken } = useVertexMetadataContext();
  const userActionState = useUserActionState();
  const {
    claim,
    isLoading: isClaiming,
    isSuccess: isClaimSuccess,
  } = useClaimLbaRewards();
  const { data: lbaAccountState } = useAccountLbaState();
  const { data: tokenLaunchStageData } = useTokenLaunchStage();
  const { data: lbaTokenClaimState } = useAccountTokenClaimState();
  const { data: vrtxMarket } = useMarket({
    productId: protocolTokenProductId,
  });
  const quotePriceUsd = useQuotePriceUsd();

  const mappedData = useMemo(() => {
    const totalRewardsEarned = removeDecimals(
      lbaTokenClaimState?.claimableLbaRewards.plus(
        lbaTokenClaimState.claimedLbaRewards,
      ),
      protocolToken.tokenDecimals,
    );
    const claimableLbaRewards = removeDecimals(
      lbaTokenClaimState?.claimableLbaRewards,
      protocolToken.tokenDecimals,
    );

    const positionValueUsd = (() => {
      if (!lbaAccountState || !vrtxMarket) {
        return;
      }
      const lpTokenValue = calcLpTokenValue(vrtxMarket.product);
      const totalLpTokens = removeDecimals(
        lbaAccountState.lockedLpBalance.plus(
          lbaAccountState.withdrawableLpBalance,
        ),
      );
      return lpTokenValue
        .multipliedBy(totalLpTokens)
        .multipliedBy(quotePriceUsd);
    })();

    return {
      totalRewardsEarned,
      claimableLbaRewards,
      positionValueUsd,
      unlockStartTimeMillis:
        tokenLaunchStageData?.stageConfigTimestampsMillis.lpVestStartTime,
    };
  }, [
    lbaAccountState,
    quotePriceUsd,
    vrtxMarket,
    tokenLaunchStageData,
    protocolToken,
    lbaTokenClaimState,
  ]);

  return {
    ...mappedData,
    isClaimSuccess,
    isClaiming,
    onClaimClick: claim,
    disableClaimButton:
      !mappedData.claimableLbaRewards ||
      mappedData.claimableLbaRewards.isZero() ||
      userActionState === 'block_all',
    disableWithdrawUnlockedButton:
      userActionState === 'block_all' ||
      !lbaAccountState?.withdrawableLpBalance ||
      lbaAccountState.withdrawableLpBalance.isZero(),
    vrtxToken: protocolToken,
  };
}

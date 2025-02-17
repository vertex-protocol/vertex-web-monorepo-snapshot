import { calcLpTokenValue } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useClaimLbaRewards } from 'client/modules/rewards/hooks/useClaimLbaRewards';
import { useTokenLaunchStage } from 'client/modules/rewards/hooks/useTokenLaunchStage';
import { removeDecimals } from '@vertex-protocol/utils';
import { useMemo } from 'react';
import { useIsConnected } from 'client/hooks/util/useIsConnected';

export function useLbaPositionSummaryCard() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const isConnected = useIsConnected();
  const {
    claim,
    isLoading: isClaiming,
    isSuccess: isClaimSuccess,
  } = useClaimLbaRewards();
  const { data: lbaAccountState } = useAccountLbaState();
  const { data: tokenLaunchStageData } = useTokenLaunchStage();
  const { data: lbaTokenClaimState } = useAccountTokenClaimState();
  const { data: vrtxMarket } = useMarket({
    productId: protocolTokenMetadata.productId,
  });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData = useMemo(() => {
    const totalRewardsEarned = removeDecimals(
      lbaTokenClaimState?.claimableLbaRewards.plus(
        lbaTokenClaimState.claimedLbaRewards,
      ),
      protocolTokenMetadata.token.tokenDecimals,
    );
    const claimableLbaRewards = removeDecimals(
      lbaTokenClaimState?.claimableLbaRewards,
      protocolTokenMetadata.token.tokenDecimals,
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
        .multipliedBy(primaryQuotePriceUsd);
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
    primaryQuotePriceUsd,
    vrtxMarket,
    tokenLaunchStageData,
    protocolTokenMetadata,
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
      !isConnected,
    disableWithdrawUnlockedButton:
      !lbaAccountState?.withdrawableLpBalance ||
      lbaAccountState.withdrawableLpBalance.isZero() ||
      !isConnected,
    vrtxToken: protocolTokenMetadata,
  };
}

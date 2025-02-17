import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useExecuteClaimStakingRewards } from 'client/hooks/execute/vrtxToken/useExecuteClaimStakingRewards';
import { useExecuteWithdrawUnstakedVrtx } from 'client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedVrtx';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useCallback, useEffect, useMemo } from 'react';

export function useStakingV1Section() {
  const { data: accountStakingState } = useAccountStakingState();
  const { data: stakingState } = useStakingState();
  const {
    primaryQuoteToken: { tokenDecimals: quoteDecimals, symbol: quoteSymbol },
    protocolTokenMetadata: {
      productId: protocolTokenProductId,
      token: {
        tokenDecimals: protocolTokenDecimals,
        symbol: protocolTokenSymbol,
      },
    },
  } = useVertexMetadataContext();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenProductId,
  });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();

  const {
    amountStaked,
    amountStakedValueUsd,
    accountUsdcRewardsClaimable,
    accountUsdcRewardsEarned,
    accountUnstakedClaimable,
    accountUnstakedLocked,
  } = useMemo(() => {
    const amountStaked = removeDecimals(
      accountStakingState?.amountStaked,
      protocolTokenDecimals,
    );

    const amountStakedValueUsd = (() => {
      if (!vrtxSpotMarket) {
        return undefined;
      }

      return amountStaked
        ?.multipliedBy(vrtxSpotMarket?.product.oraclePrice)
        .multipliedBy(primaryQuotePriceUsd);
    })();

    const accountUsdcRewardsClaimable = removeDecimals(
      accountStakingState?.claimableRewards,
      quoteDecimals,
    );

    const accountUsdcRewardsEarned = removeDecimals(
      accountStakingState?.totalRewards,
      quoteDecimals,
    );

    const accountUnstakedLocked = removeDecimals(
      accountStakingState?.unstakedLocked,
      protocolTokenDecimals,
    );

    const accountUnstakedClaimable = removeDecimals(
      accountStakingState?.unstakedClaimable,
      protocolTokenDecimals,
    );

    return {
      amountStaked,
      amountStakedValueUsd,
      accountUsdcRewardsEarned,
      accountUsdcRewardsClaimable,
      accountUnstakedLocked,
      accountUnstakedClaimable,
    };
  }, [
    accountStakingState,
    protocolTokenDecimals,
    vrtxSpotMarket,
    quoteDecimals,
    primaryQuotePriceUsd,
  ]);

  const isUnstakedClaimable = !!accountUnstakedClaimable?.gt(0);
  const isUnstakedLocked = !!accountUnstakedLocked?.gt(0);

  const showRewardsCard = !!accountUsdcRewardsClaimable?.gt(0);
  const showPositionCard = !!amountStaked?.gt(0);
  const showUnstakedCard = isUnstakedLocked || isUnstakedClaimable;

  const sectionState = {
    showRewardsCard,
    showPositionCard,
    isUnstakedClaimable,
    isUnstakedLocked,
    showUnstakedCard,
    showSection: showRewardsCard || showPositionCard || showUnstakedCard,
  };

  const unstakedUnlockTimeMillis = (() => {
    if (!accountStakingState?.lastUnstakeTime) {
      return undefined;
    }

    return stakingState?.unstakeUnlockTimeIntervalMillis
      .plus(accountStakingState.lastUnstakeTime.multipliedBy(1000))
      .toNumber();
  })();

  /**
   * Withdraw Claimable Mutation
   */
  const executeWithdrawUnstakedVrtx = useExecuteWithdrawUnstakedVrtx();
  const withdrawUnstakedV1VrtxMutation =
    executeWithdrawUnstakedVrtx.mutateAsync;

  const {
    isLoading: isWithdrawUnstakedTxLoading,
    isSuccess: isWithdrawUnstakedTxSuccess,
  } = useOnChainMutationStatus({
    mutationStatus: executeWithdrawUnstakedVrtx.status,
    txHash: executeWithdrawUnstakedVrtx.data,
  });

  useEffect(() => {
    if (!isWithdrawUnstakedTxSuccess) {
      return;
    }

    show({
      type: 'action_success',
      params: {
        title: `Unstaked ${protocolTokenSymbol} Claimed`,
        description: `You have successfully claimed your unstaked ${protocolTokenSymbol}. You will receive the claimed ${protocolTokenSymbol} directly in your wallet.`,
      },
    });
  }, [isWithdrawUnstakedTxSuccess, protocolTokenSymbol, show]);

  const withdrawClaimable = useCallback(async () => {
    const txHashPromise = withdrawUnstakedV1VrtxMutation({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Withdraw Unstaked VRTX Failed',
        executionData: {
          txHashPromise,
        },
      },
    });
  }, [dispatchNotification, withdrawUnstakedV1VrtxMutation]);

  /**
   * Claim rewards mutation
   */
  const executeClaimV1StakingRewards = useExecuteClaimStakingRewards();
  const claimV1StakingRewardsMutation =
    executeClaimV1StakingRewards.mutateAsync;

  const {
    isLoading: isClaimV1StakingRewardsTxLoading,
    isSuccess: isClaimV1StakingRewardsTxSuccess,
  } = useOnChainMutationStatus({
    mutationStatus: executeClaimV1StakingRewards.status,
    txHash: executeClaimV1StakingRewards.data,
  });

  useEffect(() => {
    if (!isClaimV1StakingRewardsTxSuccess) {
      return;
    }

    show({
      type: 'action_success',
      params: {
        title: `${quoteSymbol} Rewards Claimed`,
        description: `You have successfully claimed your ${quoteSymbol} staking rewards. You will receive the claimed ${quoteSymbol} directly in your wallet.`,
      },
    });
  }, [isClaimV1StakingRewardsTxSuccess, quoteSymbol, show]);

  const claimV1StakingRewards = useCallback(async () => {
    const txHashPromise = claimV1StakingRewardsMutation({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Claim V1 Staking Rewards Failed',
        executionData: {
          txHashPromise,
        },
      },
    });
  }, [dispatchNotification, claimV1StakingRewardsMutation]);

  return {
    accountUsdcRewardsEarned,
    accountUsdcRewardsClaimable,
    amountStaked,
    amountStakedValueUsd,
    accountUnstakedLocked,
    accountUnstakedClaimable,
    unstakedUnlockTimeMillis,
    sectionState,
    isWithdrawUnstakedTxLoading,
    withdrawClaimable,
    isClaimV1StakingRewardsTxLoading,
    claimV1StakingRewards,
    protocolTokenSymbol,
  };
}

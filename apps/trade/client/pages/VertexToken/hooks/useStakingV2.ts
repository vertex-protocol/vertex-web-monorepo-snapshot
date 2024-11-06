import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useExecuteWithdrawUnstakedV2Vrtx } from 'client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedV2Vrtx';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useStakingMigrationState } from 'client/hooks/query/vrtxToken/useStakingMigrationState';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useStakingV2State } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { useVrtxTokenSupply } from 'client/hooks/query/vrtxToken/useVrtxTokenSupply';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useStakingV2Apr } from 'client/modules/staking/hooks/useStakingV2Apr';
import { safeDiv } from 'client/utils/safeDiv';
import { last, now } from 'lodash';
import { useCallback, useMemo } from 'react';

export function useStakingV2() {
  const {
    protocolTokenMetadata: {
      productId: protocolTokenProductId,
      token: {
        symbol: protocolTokenSymbol,
        tokenDecimals: protocolTokenDecimals,
      },
    },
  } = useVertexMetadataContext();
  const { data: stakingState } = useStakingState();
  const { data: accountStakingState } = useAccountStakingState();
  const { data: accountStakingV2State } = useAccountStakingV2State();
  const { data: stakingV2State } = useStakingV2State();
  const { data: stakingMigrationState } = useStakingMigrationState();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenProductId,
  });
  const { data: vrtxTokenSupply } = useVrtxTokenSupply();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const stakingApr = useStakingV2Apr();

  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();

  const {
    currentAmountEarned,
    currentBalance,
    currentBalanceValueUsd,
    combinedPoolLiquidSupplyFraction,
    combinedPoolTotalBalance,
    shareOfPool,
    amountStaked,
  } = useMemo(() => {
    const poolTotalBalance = removeDecimals(
      stakingV2State?.totalBalance,
      protocolTokenDecimals,
    );
    const currentBalance = removeDecimals(
      accountStakingV2State?.currentBalance,
      protocolTokenDecimals,
    );
    const amountStaked = removeDecimals(
      accountStakingV2State?.amountStaked,
      protocolTokenDecimals,
    );

    const currentAmountEarned = (() => {
      if (!amountStaked) {
        return undefined;
      }

      return currentBalance?.minus(amountStaked);
    })();

    const currentBalanceValueUsd = (() => {
      if (!vrtxSpotMarket) {
        return undefined;
      }

      return currentBalance
        ?.multipliedBy(vrtxSpotMarket.product.oraclePrice)
        .multipliedBy(primaryQuotePriceUsd);
    })();

    const shareOfPool = (() => {
      if (!poolTotalBalance || !currentBalance) {
        return undefined;
      }

      return safeDiv(currentBalance, poolTotalBalance);
    })();

    const combinedPoolTotalBalance = (() => {
      if (!stakingState?.totalStaked || !poolTotalBalance) {
        return undefined;
      }

      return removeDecimals(
        stakingState?.totalStaked,
        protocolTokenDecimals,
      )?.plus(poolTotalBalance);
    })();

    const combinedPoolLiquidSupplyFraction = (() => {
      if (!combinedPoolTotalBalance || !vrtxTokenSupply) {
        return undefined;
      }

      return safeDiv(combinedPoolTotalBalance, vrtxTokenSupply.liquidSupply);
    })();

    return {
      combinedPoolTotalBalance,
      combinedPoolLiquidSupplyFraction,
      currentBalance,
      currentAmountEarned,
      currentBalanceValueUsd,
      shareOfPool,
      amountStaked,
    };
  }, [
    stakingV2State?.totalBalance,
    protocolTokenDecimals,
    accountStakingV2State?.currentBalance,
    accountStakingV2State?.amountStaked,
    vrtxSpotMarket,
    primaryQuotePriceUsd,
    stakingState?.totalStaked,
    vrtxTokenSupply,
  ]);

  const migrationBonusFrac = (() => {
    if (
      !accountStakingState?.amountStaked ||
      !stakingMigrationState?.v2MigrationBonus
    ) {
      return undefined;
    }

    return safeDiv(
      stakingMigrationState.v2MigrationBonus,
      accountStakingState.amountStaked,
    );
  })();

  /**
   * Withdraw claimable mutation
   */
  const executeWithdrawClaimable = useExecuteWithdrawUnstakedV2Vrtx();

  const {
    isLoading: withdrawClaimableIsLoading,
    isSuccess: withdrawClaimableIsSuccess,
  } = useOnChainMutationStatus({
    mutationStatus: executeWithdrawClaimable.status,
    txResponse: executeWithdrawClaimable.data,
  });

  useRunWithDelayOnCondition({
    condition: withdrawClaimableIsSuccess,
    fn: () =>
      show({
        type: 'action_success',
        params: {
          title: `Unstaked ${protocolTokenSymbol} Claimed`,
          description: `You have successfully claimed your unstaked ${protocolTokenSymbol}. You will receive the claimed ${protocolTokenSymbol} directly in your wallet.`,
        },
      }),
  });

  const withdrawClaimable = useCallback(async () => {
    const txResponsePromise = executeWithdrawClaimable.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Withdraw unstaked failed',
        executionData: { txResponsePromise },
      },
    });
  }, [dispatchNotification, executeWithdrawClaimable]);

  return {
    amountStaked,
    currentAmountEarned,
    currentBalance,
    currentBalanceValueUsd,
    shareOfPool,
    combinedPoolTotalBalance,
    combinedPoolLiquidSupplyFraction,
    isBonusPeriod: !!stakingMigrationState?.v2BonusDeadlineMillis.gt(now()),
    stakingApr,
    migrationBonusFrac,
    lastFeeDistributionAmount: removeDecimals(
      last(stakingV2State?.rewardsDistributions)?.feeAmount,
    ),
    isUnstakedLocked:
      !!accountStakingV2State?.unstakedClaimableTimeMillis?.gt(now()),
    unstakedClaimableTimeMillis:
      accountStakingV2State?.unstakedClaimableTimeMillis?.toNumber(),
    unstakedClaimable: removeDecimals(
      accountStakingV2State?.unstakedClaimable,
      protocolTokenDecimals,
    ),
    withdrawClaimable,
    withdrawClaimableIsLoading,
    withdrawClaimableIsSuccess,
  };
}

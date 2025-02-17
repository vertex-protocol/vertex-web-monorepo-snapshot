import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { safeDiv } from '@vertex-protocol/web-common';
import { useExecuteWithdrawUnstakedV2Vrtx } from 'client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedV2Vrtx';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useStakingV2State } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { useVrtxTokenSupply } from 'client/hooks/query/vrtxToken/useVrtxTokenSupply';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useStakingV2Rewards } from 'client/modules/staking/hooks/useStakingV2Rewards';
import { useVrtxMarketMetrics } from 'client/modules/staking/hooks/useVrtxMarketMetrics';
import { useStakingV2HistoryUrl } from 'client/pages/Staking/v2/useStakingV2HistoryUrl';
import { now } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';

export function useStakingV2Section() {
  const {
    protocolTokenMetadata: {
      token: {
        symbol: protocolTokenSymbol,
        tokenDecimals: protocolTokenDecimals,
      },
    },
  } = useVertexMetadataContext();
  const { data: stakingState } = useStakingState();
  const { data: accountStakingV2State } = useAccountStakingV2State();
  const { data: stakingV2State } = useStakingV2State();
  const { data: vrtxTokenSupply } = useVrtxTokenSupply();
  const { oraclePrice: vrtxOraclePrice } = useVrtxMarketMetrics();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { apr: stakingApr, lastUsdcDistributionAmount } = useStakingV2Rewards();
  const stakingV2HistoryUrl = useStakingV2HistoryUrl();

  const { show } = useDialog();
  const { dispatchNotification } = useNotificationManagerContext();

  const {
    amountStaked,
    amountStakedValueUsd,
    currentBalance,
    currentBalanceValueUsd,
    currentAmountEarned,
    currentAmountEarnedValueUsd,
    combinedPoolLiquidSupplyFraction,
    combinedPoolTotalBalance,
    shareOfPool,
    unstakedClaimableTimeMillis,
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

    const {
      amountStakedValueUsd,
      currentAmountEarnedValueUsd,
      currentBalanceValueUsd,
    } = (() => {
      if (!vrtxOraclePrice) {
        return {};
      }

      const vrtxMarketPriceUsd =
        vrtxOraclePrice.multipliedBy(primaryQuotePriceUsd);

      return {
        amountStakedValueUsd: amountStaked?.multipliedBy(vrtxMarketPriceUsd),
        currentBalanceValueUsd:
          currentBalance?.multipliedBy(vrtxMarketPriceUsd),
        currentAmountEarnedValueUsd:
          currentAmountEarned?.multipliedBy(vrtxMarketPriceUsd),
      };
    })();

    const shareOfPool = (() => {
      if (!poolTotalBalance || !currentBalance) {
        return undefined;
      }

      return safeDiv(currentBalance, poolTotalBalance);
    })();

    const combinedPoolTotalBalance = (() => {
      if (!poolTotalBalance) {
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

    const unstakedClaimableTimeMillis =
      accountStakingV2State?.unstakedClaimableTimeMillis;

    return {
      amountStaked,
      amountStakedValueUsd,
      combinedPoolTotalBalance,
      combinedPoolLiquidSupplyFraction,
      currentAmountEarned,
      currentAmountEarnedValueUsd,
      currentBalance,
      currentBalanceValueUsd,
      shareOfPool,
      unstakedClaimableTimeMillis,
    };
  }, [
    stakingV2State?.totalBalance,
    protocolTokenDecimals,
    accountStakingV2State,
    vrtxOraclePrice,
    primaryQuotePriceUsd,
    stakingState?.totalStaked,
    vrtxTokenSupply,
  ]);

  /**
   * Withdraw claimable mutation
   */
  const executeWithdrawUnstakedV2Vrtx = useExecuteWithdrawUnstakedV2Vrtx();
  const withdrawUnstakedV2VrtxMutation =
    executeWithdrawUnstakedV2Vrtx.mutateAsync;

  const {
    isLoading: isWithdrawUnstakedTxLoading,
    isSuccess: isWithdrawUnstakedTxSuccess,
  } = useOnChainMutationStatus({
    mutationStatus: executeWithdrawUnstakedV2Vrtx.status,
    txHash: executeWithdrawUnstakedV2Vrtx.data,
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

  const withdrawUnstaked = useCallback(async () => {
    const txHashPromise = withdrawUnstakedV2VrtxMutation({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Withdraw unstaked failed',
        executionData: { txHashPromise },
      },
    });
  }, [dispatchNotification, withdrawUnstakedV2VrtxMutation]);

  return {
    amountStaked,
    amountStakedValueUsd,
    currentAmountEarned,
    currentAmountEarnedValueUsd,
    currentBalance,
    currentBalanceValueUsd,
    shareOfPool,
    combinedPoolTotalBalance,
    combinedPoolLiquidSupplyFraction,
    protocolTokenSymbol,
    stakingApr,
    lastUsdcDistributionAmount,
    isUnstakedClaimable: !!unstakedClaimableTimeMillis?.lt(now()),
    unstakedClaimableTimeMillis: unstakedClaimableTimeMillis?.toNumber(),
    unstakedClaimable: removeDecimals(
      accountStakingV2State?.unstakedClaimable,
      protocolTokenDecimals,
    ),
    withdrawUnstaked,
    isWithdrawUnstakedTxLoading,
    stakingV2HistoryUrl,
  };
}

import { BigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useStakingV2State } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { useStakingV2Rewards } from 'client/modules/staking/hooks/useStakingV2Rewards';
import { safeDiv } from '@vertex-protocol/web-common';
import { useMemo } from 'react';

export interface StakingDialogAccountState {
  accountBalance: BigDecimal | undefined;
  shareOfPool: BigDecimal | undefined;
}

export function useStakeV2VrtxSummary({
  validAmount,
}: {
  validAmount: BigDecimal | undefined;
}) {
  const { data: accountStakingV2State } = useAccountStakingV2State();
  const { data: stakingV2State } = useStakingV2State();
  const {
    protocolTokenMetadata: {
      token: {
        tokenDecimals: protocolTokenDecimals,
        symbol: protocolTokenSymbol,
      },
    },
  } = useVertexMetadataContext();
  const { apr: stakingApr } = useStakingV2Rewards();

  const currentStakingSummary = useMemo(() => {
    const accountBalance = removeDecimals(
      accountStakingV2State?.currentBalance,
      protocolTokenDecimals,
    );

    const shareOfPool = (() => {
      if (!accountBalance || !stakingV2State?.totalBalance) {
        return undefined;
      }

      return safeDiv(accountBalance, stakingV2State.totalBalance);
    })();

    return {
      shareOfPool,
      accountBalance,
    };
  }, [
    accountStakingV2State,
    stakingV2State?.totalBalance,
    protocolTokenDecimals,
  ]);

  // Estimated staking items based on a valid input
  const estimatedStakingSummary = useMemo(():
    | StakingDialogAccountState
    | undefined => {
    // Returning early if there is no valid input
    // or we don't have data, so all values in the estimate are defined
    if (
      !currentStakingSummary.accountBalance ||
      !stakingV2State ||
      !validAmount
    ) {
      return;
    }

    const estimatedAccountStaked =
      currentStakingSummary.accountBalance.plus(validAmount);

    const newTotalPoolBalance = removeDecimals(
      stakingV2State.totalBalance,
      protocolTokenDecimals,
    ).plus(validAmount);

    const estimatedShareOfPool = safeDiv(
      estimatedAccountStaked,
      newTotalPoolBalance,
    );

    return {
      accountBalance: estimatedAccountStaked,
      shareOfPool: estimatedShareOfPool,
    };
  }, [
    currentStakingSummary.accountBalance,
    stakingV2State,
    validAmount,
    protocolTokenDecimals,
  ]);

  return {
    currentSummary: currentStakingSummary,
    estimatedSummary: estimatedStakingSummary,
    stakingApr,
    protocolTokenSymbol,
  };
}

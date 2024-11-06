import { BigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { removeDecimals } from '@vertex-protocol/utils';
import { useAccountStakingV2State } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { useStakingMigrationState } from 'client/hooks/query/vrtxToken/useStakingMigrationState';
import { useStakingV2State } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { STAKING_BONUS_FRACTION } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/consts';
import { useStakingV2Apr } from 'client/modules/staking/hooks/useStakingV2Apr';
import { safeDiv } from 'client/utils/safeDiv';
import { now } from 'lodash';
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
  const { data: stakingMigrationState } = useStakingMigrationState();
  const {
    protocolTokenMetadata: {
      token: {
        tokenDecimals: protocolTokenDecimals,
        symbol: protocolTokenSymbol,
      },
    },
  } = useVertexMetadataContext();
  const stakingApr = useStakingV2Apr();

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
      !stakingMigrationState ||
      !validAmount
    ) {
      return;
    }

    const isBonusPeriod = stakingMigrationState.v2BonusDeadlineMillis.lt(now());

    const adjustedAmount = isBonusPeriod
      ? validAmount.multipliedBy(1 + STAKING_BONUS_FRACTION)
      : validAmount;

    const estimatedAccountStaked =
      currentStakingSummary.accountBalance.plus(adjustedAmount);

    const newTotalPoolBalance = removeDecimals(
      stakingV2State.totalBalance,
      protocolTokenDecimals,
    ).plus(adjustedAmount);

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
    stakingMigrationState,
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

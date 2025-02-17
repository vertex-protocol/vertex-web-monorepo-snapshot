import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { safeDiv } from '@vertex-protocol/web-common';
import { useExecuteMigrateStakingV1ToV2 } from 'client/hooks/execute/vrtxToken/useExecuteMigrateStakingV1ToV2';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo } from 'react';

export function useMigrateStakingDialog() {
  const {
    protocolTokenMetadata: {
      token: {
        tokenDecimals: protocolTokenDecimals,
        symbol: protocolTokenSymbol,
      },
    },
  } = useVertexMetadataContext();
  const { data: accountStakingState } = useAccountStakingState();
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const {
    currentV1AmountStaked,
    currentV1ScoreMultiplierFraction,
    estimatedV2Balance,
  } = useMemo(() => {
    const currentV1AmountStaked = removeDecimals(
      accountStakingState?.amountStaked,
      protocolTokenDecimals,
    );

    const currentV1ScoreMultiplierFraction = (() => {
      if (!accountStakingState) {
        return undefined;
      }

      return safeDiv(
        accountStakingState.stakingScore,
        accountStakingState.amountStaked,
      );
    })();

    return {
      currentV1AmountStaked,
      currentV1ScoreMultiplierFraction,
      estimatedV2Balance: currentV1AmountStaked,
    };
  }, [accountStakingState, protocolTokenDecimals]);

  const executeMigrateStaking = useExecuteMigrateStakingV1ToV2();
  const migrateMutation = executeMigrateStaking.mutateAsync;

  const { isLoading: isMigrationTxLoading, isSuccess: isMigrationTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeMigrateStaking.status,
      txHash: executeMigrateStaking.data,
    });

  useRunWithDelayOnCondition({
    condition: isMigrationTxSuccess,
    fn: hide,
  });

  const buttonState = useMemo((): BaseActionButtonState => {
    if (isMigrationTxLoading) {
      return 'loading';
    } else if (isMigrationTxSuccess) {
      return 'success';
    } else if (currentV1AmountStaked?.isZero()) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [isMigrationTxLoading, isMigrationTxSuccess, currentV1AmountStaked]);

  const migrate = useCallback(async () => {
    const txHashPromise = migrateMutation({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'VRTX Migration Failed',
        executionData: { txHashPromise },
      },
    });
  }, [migrateMutation, dispatchNotification]);

  return {
    buttonState,
    protocolTokenSymbol,
    currentV1AmountStaked,
    currentV1ScoreMultiplierFraction,
    estimatedV2Balance,
    migrate,
  };
}

import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useExecuteMigrateStakingV1ToV2 } from 'client/hooks/execute/vrtxToken/useExecuteMigrateStakingV1ToV2';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useStakingMigrationState } from 'client/hooks/query/vrtxToken/useStakingMigrationState';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { safeDiv } from 'client/utils/safeDiv';
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
  const { data: stakingMigrationState } = useStakingMigrationState();
  const { data: accountStakingState } = useAccountStakingState();
  const { dispatchNotification } = useNotificationManagerContext();
  const { show } = useDialog();

  const {
    currentV1AmountStaked,
    estimatedV2Balance,
    migrationBonus,
    migrationBonusFraction,
    bonusDeadlineMillis,
  } = useMemo(() => {
    const migrationBonus = removeDecimals(
      stakingMigrationState?.v2MigrationBonus,
    );

    const currentV1AmountStaked = removeDecimals(
      accountStakingState?.amountStaked,
      protocolTokenDecimals,
    );

    const migrationBonusFraction = (() => {
      if (!currentV1AmountStaked || !migrationBonus) {
        return undefined;
      }

      return safeDiv(migrationBonus, currentV1AmountStaked);
    })();

    const estimatedV2Balance = (() => {
      if (!currentV1AmountStaked) {
        return undefined;
      }

      return migrationBonus?.plus(currentV1AmountStaked);
    })();

    return {
      currentV1AmountStaked,
      estimatedV2Balance,
      migrationBonus,
      migrationBonusFraction,
      bonusDeadlineMillis:
        stakingMigrationState?.v2BonusDeadlineMillis.toNumber(),
    };
  }, [
    accountStakingState?.amountStaked,
    protocolTokenDecimals,
    stakingMigrationState?.v2MigrationBonus,
    stakingMigrationState?.v2BonusDeadlineMillis,
  ]);

  const executeMigrateStaking = useExecuteMigrateStakingV1ToV2();
  const migrateMutation = executeMigrateStaking.mutateAsync;

  const { isLoading: isMigrationTxLoading, isSuccess: isMigrationTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeMigrateStaking.status,
      txResponse: executeMigrateStaking.data,
    });

  useRunWithDelayOnCondition({
    condition: isMigrationTxSuccess,
    fn: () => {
      show({
        type: 'action_success',
        params: {
          title: 'Migration Complete!',
          description: `Your staked ${protocolTokenSymbol} and migration bonus has been migrated to V2.`,
        },
      });
    },
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
    const txResponsePromise = migrateMutation({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'VRTX Migration Failed',
        executionData: { txResponsePromise },
      },
    });
  }, [migrateMutation, dispatchNotification]);

  return {
    buttonState,
    protocolTokenSymbol,
    currentV1AmountStaked,
    estimatedV2Balance,
    bonusDeadlineMillis,
    migrationBonus,
    migrationBonusFraction,
    migrate,
  };
}

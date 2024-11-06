import { BigDecimal } from '@vertex-protocol/client';
import { useExecuteFastWithdrawal } from 'client/hooks/execute/useExecuteFastWithdrawal';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo } from 'react';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useFastWithdrawFormData } from 'client/modules/collateral/fastWithdraw/hooks/useFastWithdrawFormData';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';

export type FastWithdrawFormError =
  | 'withdrawal_size_below_minimum_value'
  | 'insufficient_liquidity'
  | 'withdrawal_completed';

interface Params {
  submissionIndex: string;
  productId: number;
  /** decimal adjusted withdrawal size */
  withdrawalSize: BigDecimal;
}

export function useFastWithdrawForm({
  submissionIndex,
  productId,
  withdrawalSize,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const {
    isWithdrawProcessing,
    withdrawPoolLiquidity,
    withdrawalFeeAmount,
    productMetadata,
  } = useFastWithdrawFormData({
    productId,
    submissionIndex,
    withdrawalSize,
  });

  const executeFastWithdrawal = useExecuteFastWithdrawal();
  const { isLoading, isSuccess } = useOnChainMutationStatus({
    mutationStatus: executeFastWithdrawal.status,
    txResponse: executeFastWithdrawal.data,
  });

  useRunWithDelayOnCondition({
    condition: isSuccess,
    fn: hide,
  });

  const formError: FastWithdrawFormError | undefined = useMemo(() => {
    // Withdrawal already completed, equal to false to prevent rendering on undefined (in case when it's loading).
    // Also don't render if mutation is loading or after success.
    if (isWithdrawProcessing === false && !isSuccess && !isLoading) {
      return 'withdrawal_completed';
    }

    if (
      // If fee is equal or greater than withdrawal size
      withdrawalFeeAmount?.gte(withdrawalSize)
    ) {
      return 'withdrawal_size_below_minimum_value';
    }

    // Insufficient liquidity in withdraw pool
    if (withdrawPoolLiquidity?.lt(withdrawalSize)) {
      return 'insufficient_liquidity';
    }

    return;
  }, [
    isLoading,
    isSuccess,
    isWithdrawProcessing,
    withdrawPoolLiquidity,
    withdrawalFeeAmount,
    withdrawalSize,
  ]);

  // Action Button State
  const buttonState = useMemo((): BaseActionButtonState => {
    if (isLoading) {
      return 'loading';
    } else if (isSuccess) {
      return 'success';
    } else if (formError) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [formError, isLoading, isSuccess]);

  const onSubmit = useCallback(() => {
    const serverExecutionResult = executeFastWithdrawal.mutateAsync({
      submissionIndex,
    });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Fast Withdraw Failed',
        executionData: {
          serverExecutionResult,
        },
      },
    });
  }, [dispatchNotification, executeFastWithdrawal, submissionIndex]);

  return {
    onSubmit,
    buttonState,
    formError,
    withdrawalFeeAmount,
    productMetadata,
  };
}

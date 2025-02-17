import { toBigDecimal } from '@vertex-protocol/client';
import { BigDecimal, BigDecimalish } from '@vertex-protocol/utils';
import { useExecuteApproveAllowance } from 'client/hooks/execute/useExecuteApproveAllowance';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useTokenAllowance } from 'client/hooks/query/useTokenAllowance';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { ApprovalButtonState } from 'client/types/OnChainActionButtonStateWithApproval';
import { useCallback, useMemo } from 'react';

interface Params {
  /**
   * Amount associated with form input including decimals - i.e. 1 USDC = 10^6
   * Used only for state calculations
   */
  amountWithDecimals: BigDecimal | undefined;
  /**
   * Address that wants to receive/spend the token
   */
  spenderAddress: string | undefined;
  /**
   * Address of the ERC20 token to approve
   */
  tokenAddress: string | undefined;
}

interface UseFormTokenAllowance {
  /**
   * Mutation for approving token allowance
   */
  approveMutation: ReturnType<typeof useExecuteApproveAllowance>;
  /**
   * Util mutation handler that approves token allowance and dispatches an error notification if an error occurs
   */
  approve: (amount: BigDecimalish) => void;
  /**
   * Whether the token allowance needs to be approved
   */
  requiresApproval: boolean;
  /**
   * Action button state during the approval flow, undefined if not within the approval flow (i.e. no approval is required)
   */
  approvalButtonState: ApprovalButtonState | undefined;
}

/**
 * Util hook that combines queries, states, and mutations associated with a workflow that requires token allowance changes
 */
export function useFormTokenAllowance({
  amountWithDecimals,
  spenderAddress,
  tokenAddress,
}: Params): UseFormTokenAllowance {
  const { dispatchNotification } = useNotificationManagerContext();

  // Mutation related hooks
  const approveMutation = useExecuteApproveAllowance();
  const { isLoading: isApprovalTxLoading, isSuccess: isApprovalTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: approveMutation.status,
      txHash: approveMutation.data,
    });
  useRunWithDelayOnCondition({
    condition: isApprovalTxSuccess,
    fn: approveMutation.reset,
    delay: 3000,
  });

  const { data: tokenAllowance } = useTokenAllowance({
    spenderAddress,
    tokenAddress,
  });

  const requiresApproval = useMemo(() => {
    // Default to false if no data
    if (!amountWithDecimals || amountWithDecimals.lte(0) || !tokenAllowance) {
      return false;
    }
    return tokenAllowance.lt(amountWithDecimals);
  }, [amountWithDecimals, tokenAllowance]);

  const approve = useCallback(
    (amount: BigDecimalish) => {
      if (!spenderAddress || !tokenAddress) {
        console.warn(
          '[useFormTokenAllowance] Missing spenderAddress or tokenAddress',
          spenderAddress,
          tokenAddress,
        );
        return;
      }

      const serverExecutionResult = approveMutation.mutateAsync({
        spenderAddress,
        tokenAddress,
        amount: BigInt(toBigDecimal(amount).toFixed()),
      });
      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Approve Failed',
          executionData: { serverExecutionResult },
        },
      });
    },
    [approveMutation, dispatchNotification, spenderAddress, tokenAddress],
  );

  const approvalButtonState = useMemo((): ApprovalButtonState | undefined => {
    if (isApprovalTxSuccess) {
      return 'approve_success';
    }
    if (isApprovalTxLoading) {
      return 'approve_loading';
    }
    if (requiresApproval) {
      return 'approve_idle';
    }
  }, [isApprovalTxLoading, isApprovalTxSuccess, requiresApproval]);

  return {
    approveMutation,
    approve,
    requiresApproval,
    approvalButtonState,
  };
}

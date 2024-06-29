import { addDecimals } from '@vertex-protocol/utils';
import { useExecuteApproveAllowanceForProduct } from 'client/hooks/execute/useExecuteApproveAllowanceForProduct';
import { useExecuteDepositCollateral } from 'client/hooks/execute/useExecuteDepositCollateral';
import {
  DepositFormValues,
  DepositProduct,
} from 'client/modules/collateral/deposit/types';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { blitzReferralCodeAtom } from 'client/store/referralsStore';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { roundToString } from 'client/utils/rounding';
import { MaxUint256 } from 'ethers';
import { useAtom } from 'jotai';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  useDepositForm: UseFormReturn<DepositFormValues>;
  selectedProduct: DepositProduct | undefined;
  isApprove: boolean;
  mutateApproveAllowanceAsync: ReturnType<
    typeof useExecuteApproveAllowanceForProduct
  >['mutateAsync'];
  mutateDepositCollateralAsync: ReturnType<
    typeof useExecuteDepositCollateral
  >['mutateAsync'];
}

export function useDepositFormSubmitHandler({
  useDepositForm,
  selectedProduct,
  isApprove,
  mutateApproveAllowanceAsync,
  mutateDepositCollateralAsync,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  // Only blitz uses our backend referral system
  const [referralCodeAtomValue] = useAtom(blitzReferralCodeAtom);

  return (values: DepositFormValues) => {
    if (selectedProduct == null) {
      console.warn('No selected product');
      return;
    }

    // No-op if there is no input, this prevents users from clicking on success button states
    if (!values.amount) {
      return;
    }

    const amount = resolvePercentageAmountSubmitValue(
      values,
      selectedProduct.decimalAdjustedWalletBalance,
    );

    const amountWithAddedDecimals = addDecimals(
      amount,
      selectedProduct.tokenDecimals,
    );

    if (isApprove) {
      const txResponsePromise = mutateApproveAllowanceAsync({
        productId: selectedProduct.productId,
        amount: MaxUint256,
      });
      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Approval Failed',
          executionData: {
            txResponsePromise,
          },
        },
      });
    } else {
      const txResponsePromise = mutateDepositCollateralAsync(
        {
          productId: selectedProduct.productId,
          amount: roundToString(amountWithAddedDecimals, 0),
          referralCode: referralCodeAtomValue,
        },
        {
          // Reset the form on success
          onSuccess: () => {
            useDepositForm.setValue('percentageAmount', 0);
            useDepositForm.resetField('amount');
            useDepositForm.resetField('amountSource');
          },
        },
      );
      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Deposit Failed',
          executionData: {
            txResponsePromise,
          },
        },
      });
    }
  };
}

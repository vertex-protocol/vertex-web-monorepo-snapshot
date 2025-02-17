import { useEVMContext } from '@vertex-protocol/react-client';
import { addDecimals } from '@vertex-protocol/utils';
import { useExecuteApproveAllowanceForProduct } from 'client/hooks/execute/useExecuteApproveAllowanceForProduct';
import { useExecuteDepositCollateral } from 'client/hooks/execute/useExecuteDepositCollateral';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import {
  DepositFormValues,
  DepositProductSelectValue,
} from 'client/modules/collateral/deposit/types';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { edgeReferralCodeAtom } from 'client/store/referralsStore';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { roundToString } from 'client/utils/rounding';
import { useAtom } from 'jotai';
import { UseFormReturn } from 'react-hook-form';
import { maxUint256 } from 'viem';

interface Params {
  useDepositForm: UseFormReturn<DepositFormValues>;
  selectedProduct: DepositProductSelectValue | undefined;
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
  const { primaryChainEnv } = useEVMContext();

  const { trackEvent } = useAnalyticsContext();
  const { dispatchNotification } = useNotificationManagerContext();
  const [edgeReferralCodeAtomValue] = useAtom(edgeReferralCodeAtom);

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
      const txHashPromise = mutateApproveAllowanceAsync({
        productId: selectedProduct.productId,
        amount: maxUint256,
      });
      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Approval Failed',
          executionData: {
            txHashPromise,
          },
        },
      });
    } else {
      const txHashPromise = mutateDepositCollateralAsync(
        {
          productId: selectedProduct.productId,
          amount: roundToString(amountWithAddedDecimals, 0),
          referralCode: edgeReferralCodeAtomValue,
        },
        {
          // Reset the form on success
          onSuccess: () => {
            useDepositForm.setValue('percentageAmount', 0);
            useDepositForm.resetField('amount');
            useDepositForm.resetField('amountSource');

            trackEvent({
              type: 'deposit_success',
              data: {
                depositAmount: amount.toNumber(),
                depositValue: selectedProduct.oraclePriceUsd
                  .multipliedBy(amount)
                  .toNumber(),
                productId: selectedProduct.productId,
                chainEnv: primaryChainEnv,
              },
            });
          },
        },
      );
      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Deposit Failed',
          executionData: {
            txHashPromise,
          },
        },
      });
    }
  };
}

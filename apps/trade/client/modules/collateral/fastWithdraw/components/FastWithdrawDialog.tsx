import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BigDecimal } from '@vertex-protocol/client';
import { useFastWithdrawForm } from 'client/modules/collateral/fastWithdraw/hooks/useFastWithdrawForm';
import { FastWithdrawInfoCollapsible } from 'client/modules/collateral/fastWithdraw/components/FastWithdrawInfoCollapsible';
import { FastWithdrawErrorPanel } from 'client/modules/collateral/fastWithdraw/components/FastWithdrawErrorPanel';
import { FastWithdrawSubmitButton } from 'client/modules/collateral/fastWithdraw/components/FastWithdrawSubmitButton';
import { FastWithdrawSummary } from 'client/modules/collateral/fastWithdraw/components/FastWithdrawSummary';

export interface FastWithdrawDialogParams {
  submissionIndex: string;
  productId: number;
  /** decimal adjusted withdrawal size */
  withdrawalSize: BigDecimal;
}

export function FastWithdrawDialog({
  submissionIndex,
  productId,
  withdrawalSize,
}: FastWithdrawDialogParams) {
  const { hide } = useDialog();
  const {
    onSubmit,
    buttonState,
    withdrawalFeeAmount,
    productMetadata,
    formError,
  } = useFastWithdrawForm({
    submissionIndex,
    productId,
    withdrawalSize,
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Fast Withdraw</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <FastWithdrawInfoCollapsible />
        <FastWithdrawErrorPanel formError={formError} />
        <FastWithdrawSubmitButton state={buttonState} onSubmit={onSubmit} />
        {productMetadata && (
          <FastWithdrawSummary
            withdrawalSize={withdrawalSize}
            withdrawalFeeAmount={withdrawalFeeAmount}
            metadata={productMetadata}
          />
        )}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

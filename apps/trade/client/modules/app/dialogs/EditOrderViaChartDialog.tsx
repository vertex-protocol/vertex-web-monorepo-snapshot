import { PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { useLayoutEffect } from 'react';

export interface EditOrderViaChartDialogProps {
  onClose: () => void;
}

export function EditOrderViaChartDialog({
  onClose,
}: EditOrderViaChartDialogProps) {
  const { hide } = useDialog();
  const { shouldShow, dismiss } = useShowUserDisclosure(
    'edit_order_via_chart_dialog',
  );

  // Upon dialog close, `shouldShow` gets set to `false`, and this effect then runs.
  // Else, `shouldShow` is already `false` (i.e. previosly closed) and so we close immediately.
  // Using a layout effect so it runs before paint and we avoid a flash of incorrect state.
  useLayoutEffect(() => {
    if (!shouldShow) {
      // Reset the atom state for the dialog.
      hide();
      // Run callback (resolves promise so order can continue).
      onClose();
    }
  }, [shouldShow, hide, onClose]);

  return (
    <BaseAppDialog onClose={dismiss}>
      <BaseDialog.Title onClose={dismiss}>
        Modifying Order Price
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-6 text-sm">
        You can modify orders by dragging order lines on the chart. This results
        in the cancellation of the original order and placement of a new one.
        The order modification may fail if the price of the new order is
        invalid.
        <PrimaryButton onClick={dismiss}>OK</PrimaryButton>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

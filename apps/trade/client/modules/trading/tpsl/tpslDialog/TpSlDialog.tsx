import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { TpSlMetricsCard } from './components/TpSlMetricsCard';
import { TpSlOrderManagement } from './components/TpSlOrderManagement';

export interface TpSlDialogParams {
  productId: number;
}

export function TpSlDialog({ productId }: TpSlDialogParams) {
  const { hide } = useDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>
        Take Profit & Stop Loss
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-4">
        <TpSlMetricsCard productId={productId} />
        <div className="flex flex-col gap-y-5">
          <TpSlOrderManagement productId={productId} isTakeProfit />
          <TpSlOrderManagement productId={productId} isTakeProfit={false} />
        </div>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { TpSlMetricsCard } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlMetricsCard';
import { TpSlOrderManagement } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlOrderManagement';

export interface TpSlDialogParams {
  productId: number;
}

export function TpSlDialog({ productId }: TpSlDialogParams) {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Take Profit & Stop Loss
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <TpSlMetricsCard productId={productId} />
        <div className="flex flex-col gap-y-5">
          <TpSlOrderManagement productId={productId} isTakeProfit />
          <TpSlOrderManagement productId={productId} isTakeProfit={false} />
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

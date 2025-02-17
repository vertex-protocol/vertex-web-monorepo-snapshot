import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { TpSlMetricsCard } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlMetricsCard';
import { TpSlOrderManagement } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlOrderManagement';

export interface TpSlDialogParams {
  isoSubaccountName: string | null;
  productId: number;
}

export function TpSlDialog({ productId, isoSubaccountName }: TpSlDialogParams) {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Take Profit & Stop Loss
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <TpSlMetricsCard
          productId={productId}
          isoSubaccountName={isoSubaccountName}
        />
        <div className="flex flex-col gap-y-5">
          <TpSlOrderManagement
            productId={productId}
            isTakeProfit
            isoSubaccountName={isoSubaccountName}
          />
          <TpSlOrderManagement
            productId={productId}
            isTakeProfit={false}
            isoSubaccountName={isoSubaccountName}
          />
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

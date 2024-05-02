import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarketDetailsCard } from './components/MarketDetailsCard';
import { MarketDetailsItems } from './components/MarketDetailsItems';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';

export interface MarketDetailsDialogParams {
  productId: number;
}

export function MarketDetailsDialog({ productId }: MarketDetailsDialogParams) {
  const { hide } = useDialog();
  const { data: allMarkets } = useAllMarketsStaticData();

  const marketData = allMarkets?.all[productId];

  if (!marketData) {
    return null;
  }

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Market Details</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-4">
        <MarketDetailsCard marketData={marketData} />
        <MarketDetailsItems marketData={marketData} />
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

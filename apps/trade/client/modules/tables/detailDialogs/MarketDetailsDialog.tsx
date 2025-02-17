import { ProductEngineType } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import Image from 'next/image';

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

  const sharedProductMetadata = getSharedProductMetadata(marketData.metadata);

  const isPerp = marketData.type === ProductEngineType.PERP;
  const priceIncrement = marketData.priceIncrement;
  const minSize = removeDecimals(marketData.minSize);
  const sizeIncrement = removeDecimals(marketData.sizeIncrement);

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Market Details</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <div className="flex items-center gap-x-2">
          <Image
            src={sharedProductMetadata.icon.asset}
            alt={sharedProductMetadata.marketName}
            className="size-7"
          />
          <span className="text-text-primary text-base">
            {sharedProductMetadata.marketName}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Tick Size"
            valueContent={priceIncrement?.toString() ?? ''}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Min Limit Order Size"
            valueContent={minSize?.toString()}
            valueEndElement={sharedProductMetadata.symbol}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Order Increment"
            valueContent={sizeIncrement?.toString()}
            valueEndElement={sharedProductMetadata.symbol}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Initial Weights (Long/Short)"
            valueContent={
              <>
                {marketData.longWeightInitial.toString()}
                <span className="text-text-tertiary">/</span>
                <span>{marketData.shortWeightInitial.toString()}</span>
              </>
            }
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Maint. Weights (Long/Short)"
            valueContent={
              <>
                {marketData.longWeightMaintenance.toString()}
                <span className="text-text-tertiary">/</span>
                <span>{marketData.shortWeightMaintenance.toString()}</span>
              </>
            }
          />
          {isPerp && <PerpMarketDetailItems />}
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

function PerpMarketDetailItems() {
  return (
    <>
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Funding"
        valueContent="Hourly"
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Oracle (Oracle Price)"
        valueContent="Stork Aggregate"
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Oracle (Spot Index Price)"
        valueContent="Stork Aggregate"
      />
    </>
  );
}

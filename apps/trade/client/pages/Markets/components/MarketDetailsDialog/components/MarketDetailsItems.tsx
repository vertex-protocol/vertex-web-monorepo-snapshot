import { ProductEngineType } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';

interface Props {
  marketData: StaticMarketData;
}

function PerpItems() {
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

export function MarketDetailsItems({ marketData }: Props) {
  const isPerp = marketData.type === ProductEngineType.PERP;

  const marketMetadata = getBaseProductMetadata(marketData.metadata);
  const priceIncrement = marketData.priceIncrement;

  const minSize = removeDecimals(marketData.minSize);
  const sizeIncrement = removeDecimals(marketData.sizeIncrement);

  return (
    <div className="flex flex-col gap-y-2 px-2 text-xs">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Tick Size"
        valueContent={priceIncrement?.toString() ?? ''}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Min Limit Order Size"
        valueContent={minSize?.toString()}
        valueEndElement={marketMetadata.symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Order Increment"
        valueContent={sizeIncrement?.toString()}
        valueEndElement={marketMetadata.symbol}
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
      {isPerp && <PerpItems />}
    </div>
  );
}

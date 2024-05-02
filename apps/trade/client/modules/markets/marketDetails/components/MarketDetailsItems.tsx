import { ProductEngineType } from '@vertex-protocol/client';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { LineItem } from 'client/components/LineItem/LineItem';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';

interface Props {
  marketData: StaticMarketData;
}

function PerpItems() {
  return (
    <>
      <LineItem.Base label="Funding" value="Hourly" />
      <LineItem.Base label="Oracle (Oracle Price)" value="Stork Aggregate" />
      <LineItem.Base
        label="Oracle (Spot Index Price)"
        value="Stork Aggregate"
      />
    </>
  );
}

export function MarketDetailsItems({ marketData }: Props) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const isPerp = marketData.type === ProductEngineType.PERP;

  const marketMetadata = getBaseProductMetadata(marketData.metadata);
  const priceIncrement = marketData.priceIncrement;

  const minSize = removeDecimals(marketData.minSize);
  const sizeIncrement = removeDecimals(marketData.sizeIncrement);

  return (
    <div className="flex flex-col gap-y-2 px-2 text-xs">
      <LineItem.Base
        label="Tick Size"
        value={
          <AmountWithSymbol
            formattedSize={priceIncrement?.toString() ?? ''}
            symbol={primaryQuoteToken.symbol}
          />
        }
      />
      <LineItem.Base
        label="Min Limit Order Size"
        value={
          <AmountWithSymbol
            formattedSize={minSize?.toString() ?? ''}
            symbol={marketMetadata.symbol}
          />
        }
      />
      <LineItem.Base
        label="Order Increment"
        value={
          <AmountWithSymbol
            formattedSize={sizeIncrement?.toString() ?? ''}
            symbol={marketMetadata.symbol}
          />
        }
      />
      <LineItem.Base
        label="Initial Weights (Long/Short)"
        value={
          <div className="flex gap-x-1.5">
            {marketData.longWeightInitial.toString()}
            <span className="text-text-tertiary">/</span>
            <span>{marketData.shortWeightInitial.toString()}</span>
          </div>
        }
      />
      <LineItem.Base
        label="Maint. Weights (Long/Short)"
        value={
          <div className="flex gap-x-1.5">
            {marketData.longWeightMaintenance.toString()}
            <span className="text-text-tertiary">/</span>
            <span>{marketData.shortWeightMaintenance.toString()}</span>
          </div>
        }
      />
      {isPerp && <PerpItems />}
    </div>
  );
}

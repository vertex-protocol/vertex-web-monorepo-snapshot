import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { Card, Divider } from '@vertex-protocol/web-ui';
import { MarginInfoPill } from 'client/components/MarginInfoPill';
import { MarketInfoWithSide } from 'client/components/MarketInfoWithSide';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useTpSlPositionData } from 'client/modules/trading/tpsl/tpslDialog/hooks/useTpSlPositionData';

interface Props {
  productId: number;
  isoSubaccountName: string | null;
}

export function TpSlMetricsCard({ productId, isoSubaccountName }: Props) {
  const tpSlPositionData = useTpSlPositionData({
    productId,
    isoSubaccountName,
  });

  const priceFormatSpecifier = getMarketPriceFormatSpecifier(
    tpSlPositionData?.priceIncrement,
  );

  return (
    <Card className="bg-surface-1 flex flex-col gap-y-2 rounded-sm px-3.5 py-3">
      <div className="flex items-center justify-between">
        <MarketInfoWithSide
          isPerp
          alwaysShowOrderDirection={false}
          marketName={tpSlPositionData?.metadata?.marketName}
          iconSrc={tpSlPositionData?.metadata?.icon.asset}
          amountForSide={tpSlPositionData?.amount}
        />
        <MarginInfoPill isoLeverage={tpSlPositionData?.isoLeverage} />
      </div>
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Est. Current PnL"
        valueContent={
          <PnlValueWithPercentage
            pnlFrac={tpSlPositionData?.pnlInfo.estimatedPnlFrac}
            pnlUsd={tpSlPositionData?.pnlInfo.estimatedPnlUsd}
          />
        }
        tooltip={{ id: 'estimatedPositionPnL' }}
      />
      <Divider />
      <div className="flex flex-col gap-y-1.5">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Avg. Entry"
          value={tpSlPositionData?.averageEntryPrice}
          numberFormatSpecifier={priceFormatSpecifier}
          tooltip={{ id: 'averageEntryPrice' }}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Last Price"
          value={tpSlPositionData?.lastPrice}
          numberFormatSpecifier={priceFormatSpecifier}
          tooltip={{ id: 'lastPrice' }}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Oracle Price"
          value={tpSlPositionData?.fastOraclePrice}
          numberFormatSpecifier={priceFormatSpecifier}
          tooltip={{ id: 'oraclePrice' }}
        />
      </div>
    </Card>
  );
}

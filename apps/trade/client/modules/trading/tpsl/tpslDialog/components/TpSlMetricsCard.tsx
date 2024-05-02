import { Card, Divider } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { MarketInfoWithSide } from 'client/components/MarketInfoWithSide';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { useTpSlPositionData } from '../hooks/useTpSlPositionData';
import { TpSlPositionData } from '../types';

interface Props {
  productId: number;
}

export function TpSlMetricsCard({ productId }: Props) {
  const tpSlPositionData = useTpSlPositionData({
    productId,
  });

  const priceFormatSpecifier = getMarketPriceFormatSpecifier(
    tpSlPositionData?.priceIncrement,
  );

  return (
    <Card className="bg-surface-1 flex flex-col gap-y-2 rounded px-3.5 py-3">
      <MarketInfoWithSide
        isPerp
        alwaysShowOrderDirection={false}
        marketName={tpSlPositionData?.metadata?.name}
        iconSrc={tpSlPositionData?.metadata?.icon.asset}
        amountForSide={tpSlPositionData?.amount}
      />
      <div className="flex flex-col gap-2">
        <LineItem.Metric
          label="Est. Current PnL"
          value={tpSlPositionData?.pnlInfo}
          renderValue={(val?: TpSlPositionData['pnlInfo']) => (
            <PnlValueWithPercentage
              pnlFrac={val?.estimatedPnlFrac}
              pnlUsd={val?.estimatedPnlUsd}
            />
          )}
          tooltip={{ id: 'estimatedPositionPnL' }}
        />
        <Divider />
        <LineItem.Metric
          label="Avg. Entry"
          value={tpSlPositionData?.averageEntryPrice}
          renderValue={priceFormatSpecifier}
          tooltip={{ id: 'averageEntryPrice' }}
        />
        <LineItem.Metric
          label="Last Price"
          value={tpSlPositionData?.lastPrice}
          renderValue={priceFormatSpecifier}
          tooltip={{ id: 'lastPrice' }}
        />
        <LineItem.Metric
          label="Oracle Price"
          value={tpSlPositionData?.fastOraclePrice}
          renderValue={priceFormatSpecifier}
          tooltip={{ id: 'oraclePrice' }}
        />
      </div>
    </Card>
  );
}

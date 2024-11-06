import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Card } from '@vertex-protocol/web-ui';
import { useMakerStatistics } from 'client/hooks/query/useMakerStatistics';
import { ReactNode } from 'react';

interface Props {
  productId: number | undefined;
  epoch: number | undefined;
  interval: number;
}

export function MakerMetricsCards({ productId, epoch, interval }: Props) {
  const { data: makerStatisticsData } = useMakerStatistics({
    productId,
    epoch,
    interval,
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <MakerMetricsCard
        title="Epoch"
        value={formatNumber(epoch, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      />
      <MakerMetricsCard
        title="Rewards Coefficient"
        value={formatNumber(makerStatisticsData?.rewardCoefficient, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
        })}
      />
      <MakerMetricsCard
        title="Total MMs"
        value={formatNumber(makerStatisticsData?.makers.length, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      />
    </div>
  );
}

function MakerMetricsCard({
  title,
  value,
}: {
  title: string;
  value: ReactNode;
}) {
  return (
    <Card className="flex flex-col justify-center gap-y-2 p-4 sm:gap-y-3">
      <span className="text-text-tertiary text-sm">{title}</span>
      <span className="text-text-primary text-xl lg:text-2xl">{value}</span>
    </Card>
  );
}

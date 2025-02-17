import {
  formatNumber,
  NumberFormatSpecifier,
  NumberFormatValue,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Label, Value } from '@vertex-protocol/web-ui';
import {
  StatsDataCard,
  StatsDataCardProps,
} from 'client/components/StatsDataCard';
import { ReactNode } from 'react';

interface MarketWithRateListItemData {
  asset: string;
  rate: NumberFormatValue;
}

interface MarketWithRateListCardProps
  extends StatsDataCardProps<MarketWithRateListItemData> {
  footerAction: ReactNode;
  renderListItem: (data: MarketWithRateListItemData) => ReactNode;
}

function MarketWithRateListCard({
  title,
  description,
  headerEndElement,
  data,
  footerAction,
  renderListItem,
  isLoading,
}: MarketWithRateListCardProps) {
  return (
    <StatsDataCard
      title={title}
      description={description}
      headerEndElement={headerEndElement}
      data={data}
      isLoading={isLoading}
    >
      <div className="flex flex-1 flex-col gap-y-4">
        <div className="grid gap-x-12 lg:grid-flow-col lg:grid-rows-8">
          {data?.map(renderListItem)}
        </div>
        <div className="ml-auto font-medium">{footerAction}</div>
      </div>
    </StatsDataCard>
  );
}

interface MarketWithRateListItemProps {
  asset: string;
  rate: NumberFormatValue;
  formatSpecifier?: NumberFormatSpecifier;
  rateClassName?: string;
}

function MarketWithRateListItem({
  asset,
  rate,
  formatSpecifier = PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP,
  rateClassName,
}: MarketWithRateListItemProps) {
  return (
    <div className="border-stroke flex items-center justify-between border-b py-1">
      <Label sizeVariant="sm" className="text-text-primary font-medium">
        {asset}
      </Label>
      <Value
        sizeVariant="xs"
        className={joinClassNames('font-medium', rateClassName)}
      >
        {formatNumber(rate, {
          formatSpecifier,
        })}
      </Value>
    </div>
  );
}

export const MarketWithRateList = {
  Card: MarketWithRateListCard,
  Item: MarketWithRateListItem,
};

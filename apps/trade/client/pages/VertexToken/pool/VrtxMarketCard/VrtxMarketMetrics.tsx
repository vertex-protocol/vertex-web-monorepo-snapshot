import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';

interface Props {
  pastDayVolumeQuote: BigDecimal | undefined;
  marketCapUsd: BigDecimal | undefined;
  liquidTokenSupply: BigDecimal | undefined;
  percentStaked: BigDecimal | undefined;
}

const METRIC_VALUE_CLASSNAME = 'text-base';

export function VrtxMarketMetrics({
  className,
  liquidTokenSupply,
  marketCapUsd,
  pastDayVolumeQuote,
  percentStaked,
}: WithClassnames<Props>) {
  const { primaryQuoteToken } = useVertexMetadataContext();

  return (
    <div
      className={joinClassNames(
        'grid grid-cols-2 gap-4 sm:grid-cols-1',
        className,
      )}
    >
      <RewardsCard.MetricStackedItem
        value={pastDayVolumeQuote}
        formatSpecifier={CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED}
        label="24h Volume"
        valueClassName={METRIC_VALUE_CLASSNAME}
        symbol={primaryQuoteToken.symbol}
      />
      <RewardsCard.MetricStackedItem
        value={marketCapUsd}
        formatSpecifier={CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED}
        label="Market Cap"
        valueClassName={METRIC_VALUE_CLASSNAME}
      />
      <Divider className="hidden w-12 sm:block" />
      <RewardsCard.MetricStackedItem
        value={liquidTokenSupply}
        formatSpecifier={CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED}
        label="Liquid Supply"
        valueClassName={METRIC_VALUE_CLASSNAME}
        symbol={VRTX_TOKEN_INFO.symbol}
      />
      <RewardsCard.MetricStackedItem
        value={percentStaked}
        formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        label="Percent Staked"
        valueClassName={METRIC_VALUE_CLASSNAME}
      />
    </div>
  );
}

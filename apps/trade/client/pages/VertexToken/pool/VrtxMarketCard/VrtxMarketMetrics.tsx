import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
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
      <ValueWithLabel.Vertical
        label="24h Volume"
        value={pastDayVolumeQuote}
        numberFormatSpecifier={
          CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
        }
        valueClassName={METRIC_VALUE_CLASSNAME}
        valueEndElement={primaryQuoteToken.symbol}
      />
      <ValueWithLabel.Vertical
        label="Market Cap"
        value={marketCapUsd}
        numberFormatSpecifier={
          CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
        }
        valueClassName={METRIC_VALUE_CLASSNAME}
      />
      <Divider className="hidden w-12 sm:block" />
      <ValueWithLabel.Vertical
        label="Liquid Supply"
        value={liquidTokenSupply}
        numberFormatSpecifier={
          CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
        }
        valueClassName={METRIC_VALUE_CLASSNAME}
        valueEndElement={VRTX_TOKEN_INFO.symbol}
      />
      <ValueWithLabel.Vertical
        label="Percent Staked"
        value={percentStaked}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        valueClassName={METRIC_VALUE_CLASSNAME}
      />
    </div>
  );
}

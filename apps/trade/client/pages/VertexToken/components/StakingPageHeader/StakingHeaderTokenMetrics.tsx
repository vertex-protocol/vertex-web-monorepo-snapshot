import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { StakingProtocolTokenPriceItem } from 'client/pages/VertexToken/components/StakingProtocolTokenPriceItem';
import { useVrtxMarketMetrics } from 'client/pages/VertexToken/hooks/useVrtxMarketMetrics';
import { signDependentValue } from 'client/utils/signDependentValue';

export function StakingHeaderTokenMetrics() {
  const {
    currentPrice,
    marketPriceFormatSpecifier,
    pastDayPriceChangeFrac,
    marketName,
  } = useVrtxMarketMetrics();

  const valueColorClassName = signDependentValue(pastDayPriceChangeFrac, {
    positive: 'text-positive',
    negative: 'text-negative',
    zero: 'text-text-tertiary',
  });

  return (
    <div
      className={joinClassNames(
        'flex items-center justify-between',
        'sm:justify-stretch sm:gap-x-12',
      )}
    >
      <StakingProtocolTokenPriceItem
        marketName={marketName}
        marketPrice={currentPrice}
        marketPriceFormatSpecifier={marketPriceFormatSpecifier}
        valueClassName={valueColorClassName}
      />
      <ValueWithLabel.Vertical
        className="items-end gap-px"
        sizeVariant="xs"
        label="24h Change"
        valueContent={
          <div className="flex items-center">
            {signDependentValue(pastDayPriceChangeFrac, {
              positive: <Icons.ArrowUp />,
              negative: <Icons.ArrowDown />,
              zero: null,
            })}
            {formatNumber(pastDayPriceChangeFrac, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </div>
        }
        valueClassName={valueColorClassName}
      />
    </div>
  );
}

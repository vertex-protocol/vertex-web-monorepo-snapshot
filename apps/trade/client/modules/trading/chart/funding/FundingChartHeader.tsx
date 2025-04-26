import { BigDecimal } from '@vertex-protocol/client';
import {
  PresetNumberFormatSpecifier,
  signDependentValue,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { FundingRatePeriodSelect } from 'client/modules/trading/components/FundingRatePeriodSelect';

interface Props extends WithClassnames {
  predictedFundingRate: BigDecimal | undefined;
}

export function FundingChartHeader({ predictedFundingRate, className }: Props) {
  return (
    <div
      className={joinClassNames('flex items-center gap-x-1 text-xs', className)}
    >
      <ValueWithLabel.Horizontal
        // on mobile, we do show "Predicted Funding" in the primarily historical chart
        // as funding may not be always visible in infobar depending scroll position
        className="lg:hidden"
        sizeVariant="xs"
        label="Predicted Funding"
        value={predictedFundingRate}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP}
        valueClassName={signDependentValue(predictedFundingRate, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-tertiary',
        })}
      />
      <span className="hidden lg:flex">Standardize rates to</span>
      <FundingRatePeriodSelect />
    </div>
  );
}

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import BigDecimal from 'bignumber.js';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { FundingChartSelect } from 'client/modules/trading/chart/funding/FundingChartSelect';
import { FundingRateTimespan } from 'client/utils/calcs/funding';
import { signDependentValue } from 'client/utils/signDependentValue';

interface Props extends WithClassnames {
  timespan: FundingRateTimespan;
  setTimespan: (val: FundingRateTimespan) => void;
  predictedFundingRate: BigDecimal | undefined;
}

export function FundingChartHeader({
  predictedFundingRate,
  setTimespan,
  timespan,
  className,
}: Props) {
  return (
    <div className={joinClassNames('flex items-center gap-x-2', className)}>
      <ValueWithLabel.Horizontal
        sizeVariant="sm"
        label="Predicted Funding"
        value={predictedFundingRate}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP}
        valueClassName={signDependentValue(predictedFundingRate, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-tertiary',
        })}
      />
      <FundingChartSelect setTimespan={setTimespan} timespan={timespan} />
    </div>
  );
}

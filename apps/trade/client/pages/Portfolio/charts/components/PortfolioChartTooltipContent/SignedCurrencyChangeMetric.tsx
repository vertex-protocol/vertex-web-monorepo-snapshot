import { Icons } from '@vertex-protocol/web-ui';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { signDependentValue } from 'client/utils/signDependentValue';

interface Props {
  value: number;
  fractionalValue?: number;
}

export function SignedCurrencyChangeMetric({ value, fractionalValue }: Props) {
  return (
    <div className="flex items-center gap-x-0.5 leading-3">
      {signDependentValue(value, {
        negative: <Icons.MdArrowDownward className="text-negative shrink-0" />,
        positive: <Icons.MdArrowUpward className="text-positive shrink-0" />,
        zero: null,
      })}
      <div className="flex items-baseline gap-x-1.5">
        {formatNumber(Math.abs(value), {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
        <span className="text-text-tertiary text-xs">
          {fractionalValue != null &&
            formatNumber(Math.abs(fractionalValue), {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
        </span>
      </div>
    </div>
  );
}

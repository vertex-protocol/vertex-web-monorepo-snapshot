import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { signDependentValue } from '@vertex-protocol/react-client';

interface Props {
  pnlUsd: BigDecimal | undefined;
  pnlFrac: BigDecimal | undefined;
}

export function PnlValueWithPercentage({ pnlUsd, pnlFrac }: Props) {
  return (
    <div
      className={joinClassNames(
        'flex gap-x-1',
        signDependentValue(pnlUsd, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-secondary',
        }),
      )}
    >
      <span>
        {formatNumber(pnlUsd, {
          formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        })}
      </span>
      <span>
        (
        {formatNumber(pnlFrac, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
        )
      </span>
    </div>
  );
}

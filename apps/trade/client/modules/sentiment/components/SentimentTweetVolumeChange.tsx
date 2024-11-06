import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { signDependentValue } from 'client/utils/signDependentValue';

// format percentages without decimals as it's enough precision for tweet volumes
// and we do not have much horizontal space
const SIGNED_PERCENTAGE_INT = '+,.0%';

interface Props extends WithClassnames {
  value: number;
}

export function SentimentTweetVolumeChange({ value, className }: Props) {
  return (
    <span
      className={joinClassNames(
        signDependentValue(value, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-tertiary',
        }),
        className,
      )}
    >
      {
        // we use unsigned percentage specifier for 0 to show '0%' instead of '+0%'
        formatNumber(value, {
          formatSpecifier:
            value === 0
              ? PresetNumberFormatSpecifier.PERCENTAGE_INT
              : SIGNED_PERCENTAGE_INT,
        })
      }
    </span>
  );
}

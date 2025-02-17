import {
  formatNumber,
  PresetNumberFormatSpecifier,
  signDependentValue,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Value } from '@vertex-protocol/web-ui';

interface Props {
  estimatedPnlFrac: BigDecimal;
}

export function SocialSharingPnlInfo({ estimatedPnlFrac }: Props) {
  return (
    <Value
      // `sizeVariant` is only relevant here to make overriding the font-size easier
      sizeVariant="sm"
      className={joinClassNames(
        'text-5xl',
        signDependentValue(estimatedPnlFrac, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-secondary',
        }),
      )}
    >
      {formatNumber(estimatedPnlFrac, {
        formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
      })}
    </Value>
  );
}

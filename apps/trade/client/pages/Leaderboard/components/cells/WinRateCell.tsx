import { BigDecimal } from '@vertex-protocol/client';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { SignValueMap } from 'client/utils/signDependentValue';

function winRateColorDependentValue<T>(
  value: BigDecimal,
  mapping: SignValueMap<T>,
): T {
  return value.gte(0.5) ? mapping.positive : mapping.negative;
}

interface Props {
  fraction: BigDecimal;
}

export function WinRateCell({ fraction }: Props) {
  const textColor = winRateColorDependentValue(fraction, {
    positive: 'text-positive',
    negative: 'text-negative',
    zero: 'text-text-primary',
  });

  return (
    <TableCell className={joinClassNames(textColor, 'gap-x-2')}>
      {formatNumber(fraction, {
        formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
      })}
      <WinRateBar fraction={fraction} />
    </TableCell>
  );
}

function WinRateBar({ fraction }: { fraction: BigDecimal }) {
  const barColor = winRateColorDependentValue(fraction, {
    positive: 'bg-positive',
    negative: 'bg-negative',
    zero: 'bg-primary',
  });

  const percentage = formatNumber(fraction, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
    defaultValue: 0,
  });

  return (
    <div className="bg-surface-2 h-1 w-14">
      <div
        style={{ width: percentage }}
        className={joinClassNames('h-full origin-left', barColor)}
      />
    </div>
  );
}

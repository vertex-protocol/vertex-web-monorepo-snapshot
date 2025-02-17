import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';

interface Props {
  value: BigDecimal;
  /** Defaults to `SIGNED_PERCENTAGE_2DP` */
  formatSpecifier?: PresetNumberFormatSpecifier;
}

export function PercentageChangeCell({
  value,
  formatSpecifier = PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
}: Props) {
  const color = getSignDependentColorClassName(value);

  return (
    <TableCell className={color}>
      {formatNumber(value, { formatSpecifier })}
    </TableCell>
  );
}

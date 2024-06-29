import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { SignOfValuePill } from '../../components/SignOfValuePill';
import { MarginWeightMetrics } from '../../types';

interface Props extends TableCellProps {
  marginWeightMetrics: MarginWeightMetrics;
}

export function MarginWeightCell({ marginWeightMetrics, ...rest }: Props) {
  const formattedWeight = formatNumber(marginWeightMetrics.weight, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
  });

  const formattedMargin = formatNumber(marginWeightMetrics.marginUsd.abs(), {
    formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
  });

  return (
    <TableCell {...rest}>
      <div className="text-text-primary flex items-center gap-x-1.5">
        <div>{formattedWeight}</div>
        <div className="text-disabled text-base">/</div>
        <div className="flex items-center gap-x-1">
          <SignOfValuePill value={marginWeightMetrics.marginUsd} />
          <div>{formattedMargin}</div>
        </div>
      </div>
    </TableCell>
  );
}

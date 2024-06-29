import { joinClassNames } from '@vertex-protocol/web-common';
import { Pill } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { HistoricalLiquidationEvent } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';

interface LiquidationTypeCellProps extends TableCellProps {
  liquidatedBalanceTypes: HistoricalLiquidationEvent['liquidatedBalanceTypes'];
}

const liquidationTypeToLabel = {
  spot: 'Balance',
  perp: 'Perp Position',
  lp: 'LP Position',
};

export function LiquidationTypeCell({
  liquidatedBalanceTypes,
  className,
  ...rest
}: LiquidationTypeCellProps) {
  return (
    <TableCell
      className={joinClassNames(
        'flex flex-col items-start justify-center gap-y-2',
        className,
      )}
      {...rest}
    >
      {liquidatedBalanceTypes.map((type) => (
        <Pill colorVariant="tertiary" sizeVariant="sm" key={type}>
          {liquidationTypeToLabel[type]}
        </Pill>
      ))}
    </TableCell>
  );
}

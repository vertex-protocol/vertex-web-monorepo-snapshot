import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { HistoricalLiquidationsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';

interface LiquidationTypeCellProps extends TableCellProps {
  liquidatedBalanceTypes: HistoricalLiquidationsTableItem['liquidatedBalanceTypes'];
}

export function LiquidationTypeCell({
  liquidatedBalanceTypes,
  className,
  ...rest
}: LiquidationTypeCellProps) {
  const liquidationBalanceTypeContent = {
    spot: 'Balance',
    perp_cross: 'Perp (Cross)',
    perp_isolated: `Perp (Iso)`,
    lp: 'LP Position',
  };

  return (
    <TableCell
      className={joinClassNames(
        'text-text-tertiary flex flex-col items-start justify-center gap-y-2',
        className,
      )}
      {...rest}
    >
      {liquidatedBalanceTypes.map((type) => (
        <div key={type}>{liquidationBalanceTypeContent[type]}</div>
      ))}
    </TableCell>
  );
}

import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';

interface Props extends TableCellProps {
  timestampMillis: number;
}

export function DateTimeCell({ timestampMillis, className, ...rest }: Props) {
  const time = formatTimestamp(timestampMillis, {
    formatSpecifier: TimeFormatSpecifier.HH_MM_SS_12H,
  });
  const date = formatTimestamp(timestampMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
  });
  return (
    <TableCell className={className} {...rest}>
      <div className="text-text-tertiary flex flex-col gap-y-1">
        <span>{date}</span>
        <span>{time}</span>
      </div>
    </TableCell>
  );
}

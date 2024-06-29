import { Divider, Icons } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';
import { ReactNode } from 'react';

interface DateTimeItemProps {
  icon: ReactNode;
  timestampMillis: number;
}

function DateTimeItem({ icon, timestampMillis }: DateTimeItemProps) {
  return (
    <div
      // `grid-flow-col` to allow the icon and date to be displayed correctly in a column given the min-width of the date.
      className="text-text-tertiary grid grid-flow-col items-center gap-x-2"
    >
      <div className="flex items-center gap-x-2">
        {icon}
        <span
          // `min-w-20` to allow enough space and keep the dates from being cut off without limiting the width.
          className="text-text-secondary min-w-20"
        >
          {formatTimestamp(timestampMillis, {
            formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
          })}
        </span>
      </div>
      <Divider vertical className="h-3" />
      {formatTimestamp(timestampMillis, {
        formatSpecifier: TimeFormatSpecifier.HH_MM_SS_12H,
      })}
    </div>
  );
}

interface TimeSpanCellProps extends TableCellProps {
  start: number;
  end: number;
}

export function TimeSpanCell({ start, end, ...rest }: TimeSpanCellProps) {
  return (
    <TableCell {...rest}>
      <div className="flex flex-col gap-y-1.5">
        <DateTimeItem
          icon={
            <Icons.TbGenderNeutrois className="shrink-0 rotate-90" size={15} />
          }
          timestampMillis={start}
        />
        <DateTimeItem
          icon={
            <Icons.TbGenderNeutrois className="shrink-0 -rotate-90" size={15} />
          }
          timestampMillis={end}
        />
      </div>
    </TableCell>
  );
}

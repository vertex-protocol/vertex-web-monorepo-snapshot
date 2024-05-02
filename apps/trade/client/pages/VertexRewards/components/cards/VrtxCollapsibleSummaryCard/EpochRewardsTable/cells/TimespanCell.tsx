import { Divider, Icons } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';

interface DateTimeItemProps {
  icon: React.ReactNode;
  timestampMillis: number;
}

function DateTimeItem({ icon, timestampMillis }: DateTimeItemProps) {
  return (
    <div className="text-text-tertiary grid grid-cols-2 gap-x-2">
      <div className="flex items-center gap-x-2">
        {icon}
        <div className="text-text-secondary">
          {formatTimestamp(timestampMillis, {
            formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
          })}
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <Divider vertical className="h-2" />
        {formatTimestamp(timestampMillis, {
          formatSpecifier: TimeFormatSpecifier.HH_MM_SS_12H,
        })}
      </div>
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

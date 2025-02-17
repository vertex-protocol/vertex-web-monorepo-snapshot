import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, Label, SizeVariant, Value } from '@vertex-protocol/web-ui';
import { DateTimeValue } from 'client/components/DateTimeValue';
import { startCase } from 'lodash';
import { CronTaskInfo } from 'stationApi/baseTypes';

interface Props extends WithClassnames {
  cronTaskInfo: CronTaskInfo;
  valueSizeVariant?: SizeVariant;
}

export function CronTaskCard({
  cronTaskInfo,
  valueSizeVariant,
  className,
}: Props) {
  const {
    active,
    current_run_count,
    max_run_count,
    day_of_month,
    day_of_week,
    hour,
    minute,
    end_time,
    id,
    name,
  } = cronTaskInfo;

  const valueWithLabelProps = [
    {
      label: 'ID',
      valueContent: id,
    },
    {
      label: 'Name',
      valueContent: name,
    },
    {
      label: 'Active',
      valueContent: startCase(active.toString()),
    },
    {
      label: '# Runs',
      valueContent: current_run_count,
    },
    {
      label: 'Max Runs',
      valueContent: max_run_count ?? 'None',
    },
    {
      label: 'End Time',
      valueContent: <DateTimeValue valueInSeconds={end_time} />,
    },
    {
      label: 'Min/Hr/DoMonth/DoWeek',
      valueContent: (
        <div className="flex items-center gap-x-1">
          <CronScheduleValue value={minute} />
          <CronScheduleValue value={hour} />
          <CronScheduleValue value={day_of_month} />
          <CronScheduleValue value={day_of_week} />
        </div>
      ),
    },
  ];

  return (
    <Card className={mergeClassNames('p-4', className)}>
      {valueWithLabelProps.map(({ label, valueContent }) => {
        return (
          <div key={label} className="flex items-center gap-x-1">
            <Label sizeVariant={valueSizeVariant ?? 'xs'}>{label}:</Label>
            <Value sizeVariant={valueSizeVariant ?? 'xs'}>{valueContent}</Value>
          </div>
        );
      })}
    </Card>
  );
}

function CronScheduleValue({ value }: { value: number | null }) {
  return <span>{value ?? '-'}</span>;
}

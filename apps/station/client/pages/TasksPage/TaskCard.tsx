import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, Label, SizeVariant, Value } from '@vertex-protocol/web-ui';
import { DateTimeValue } from 'client/components/DateTimeValue';
import { startCase } from 'lodash';
import { TaskInfo } from 'stationApi/baseTypes';

interface Props extends WithClassnames {
  taskInfo: TaskInfo;
  valueSizeVariant?: SizeVariant;
}

export function TaskCard({ taskInfo, valueSizeVariant, className }: Props) {
  const {
    task_id,
    requires_signature,
    total_sigs_required,
    created_at,
    updated_at,
    status,
  } = taskInfo;

  // Status is serialized as a string or an object with a single key
  const statusLabel = startCase(
    typeof status === 'string' ? status : Object.keys(status)[0],
  );

  const valueWithLabelProps = [
    {
      label: 'ID',
      valueContent: task_id,
    },
    {
      label: 'Status',
      valueContent: statusLabel,
    },
    {
      label: 'Sig Req?',
      valueContent: startCase(requires_signature.toString()),
    },
    {
      label: '# Sigs Req',
      valueContent: total_sigs_required,
    },
    {
      label: 'Created At',
      valueContent: <DateTimeValue valueInSeconds={created_at} />,
    },
    {
      label: 'Updated At',
      valueContent: <DateTimeValue valueInSeconds={updated_at} />,
    },
  ];

  return (
    <Card className={mergeClassNames('p-4', className)}>
      {valueWithLabelProps.map(({ label, valueContent }) => {
        return (
          <div key={label} className="flex items-center gap-x-1 text-xs">
            <Label sizeVariant={valueSizeVariant ?? 'xs'}>{label}:</Label>
            <Value sizeVariant={valueSizeVariant ?? 'xs'}>{valueContent}</Value>
          </div>
        );
      })}
    </Card>
  );
}

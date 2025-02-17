import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

interface Props {
  payload: Payload[] | undefined;
}

export function StatsPieChartLegend({
  payload,
  className,
}: WithClassnames<Props>) {
  if (!payload) {
    return null;
  }

  return (
    <div className={joinClassNames('flex flex-col gap-y-1', className)}>
      {payload.map(({ value, color }) => (
        <li
          className="text-text-primary text-3xs flex flex-row items-center gap-x-0.5 text-nowrap font-medium"
          key={value}
        >
          {color && (
            <span
              style={{ backgroundColor: color }}
              className="size-1.5 rounded-full"
            />
          )}
          {value}
        </li>
      ))}
    </div>
  );
}

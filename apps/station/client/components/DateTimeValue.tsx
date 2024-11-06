import { formatTimestamp, LabelTooltip } from '@vertex-protocol/web-ui';
import { TASK_TIME_FORMAT_SPECIFIER } from 'client/consts/taskTimeFormatSpecifier';
import { secondsToMilliseconds } from 'date-fns';

interface Props {
  valueInSeconds: number | string | undefined | null;
}

export function DateTimeValue({ valueInSeconds }: Props) {
  const valueInMillis =
    valueInSeconds != null
      ? secondsToMilliseconds(Number(valueInSeconds))
      : undefined;

  return (
    <LabelTooltip label={valueInMillis} tooltipOptions={{ interactive: true }}>
      {formatTimestamp(valueInMillis, {
        formatSpecifier: TASK_TIME_FORMAT_SPECIFIER,
      })}
    </LabelTooltip>
  );
}

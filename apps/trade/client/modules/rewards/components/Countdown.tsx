import {
  joinClassNames,
  mergeClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { useCountdownDuration } from 'client/hooks/ui/useCountdownDuration';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props extends WithClassnames {
  endTimeMillis: number | undefined;
  valueClassName?: string;
  unitClassName?: string;
  segmentClassName?: string;
}

export function Countdown({
  endTimeMillis,
  valueClassName,
  unitClassName,
  segmentClassName,
  className,
}: Props) {
  const duration = useCountdownDuration(endTimeMillis);

  return (
    <div className={joinClassNames('flex items-center gap-x-2', className)}>
      <DurationSegment
        unit="D"
        value={duration.days}
        valueClassName={valueClassName}
        unitClassName={unitClassName}
        className={segmentClassName}
      />
      <DurationSegment
        unit="H"
        value={duration.hours}
        valueClassName={valueClassName}
        unitClassName={unitClassName}
        className={segmentClassName}
      />
      <DurationSegment
        unit="M"
        value={duration.minutes}
        valueClassName={valueClassName}
        unitClassName={unitClassName}
        className={segmentClassName}
      />
      <DurationSegment
        unit="S"
        value={duration.seconds}
        valueClassName={valueClassName}
        unitClassName={unitClassName}
        className={segmentClassName}
      />
    </div>
  );
}

interface DurationSegmentProps extends WithClassnames {
  unit: string;
  value: number;
  valueClassName?: string;
  unitClassName?: string;
}

function DurationSegment({
  unit,
  value,
  valueClassName,
  unitClassName,
  className,
}: DurationSegmentProps) {
  return (
    <div
      className={mergeClassNames(
        'flex items-center gap-x-1',
        'text-text-primary text-xl lg:text-2xl',
        className,
      )}
    >
      <div className={valueClassName}>
        {formatNumber(value, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      </div>
      <div
        className={mergeClassNames('text-text-tertiary text-lg', unitClassName)}
      >
        {unit}
      </div>
    </div>
  );
}

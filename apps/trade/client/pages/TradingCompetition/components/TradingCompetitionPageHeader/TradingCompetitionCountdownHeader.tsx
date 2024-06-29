import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { StatusIndicator } from 'client/components/StatusIndicator';
import { useCountdownDuration } from 'client/hooks/ui/useCountdownDuration';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionCountdownHeader() {
  const { currentContest, currentContestStatus } =
    useTradingCompetitionContext();

  if (!currentContestStatus) {
    return null;
  }

  const { title, endTime } = {
    pending: { title: 'Countdown', endTime: currentContest?.startTimeMillis },
    active: { title: 'Ends in', endTime: currentContest?.endTimeMillis },
    done: { title: undefined, endTime: undefined },
  }[currentContestStatus];

  const isDone = currentContestStatus === 'done';

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:gap-x-8">
      <div className="flex flex-col items-center gap-y-2">
        <StatusBadge status={currentContestStatus} />
        {!isDone && (
          <span className="text-text-tertiary text-2xs lg:text-xs">
            {title}
          </span>
        )}
      </div>
      {!isDone && <Countdown endTimeMillis={endTime} />}
    </div>
  );
}

function StatusBadge({ status }: { status: 'pending' | 'active' | 'done' }) {
  const { label, colorVariant } = {
    pending: { label: 'Starting soon', colorVariant: 'warning' as const },
    active: { label: 'Live', colorVariant: 'positive' as const },
    done: { label: 'Ended', colorVariant: 'primary' as const },
  }[status];

  return (
    <div
      className={joinClassNames(
        'flex items-center gap-x-1.5 rounded-full p-1 pr-2.5',
        'bg-surface-2 text-text-primary text-xs lg:text-sm',
      )}
    >
      <StatusIndicator colorVariant={colorVariant} />
      {label}
    </div>
  );
}

interface Props extends WithClassnames {
  endTimeMillis: number | undefined;
}

function Countdown({ endTimeMillis }: Props) {
  const duration = useCountdownDuration(endTimeMillis);

  return (
    <div className="grid grid-cols-4 gap-x-2">
      <DurationSegment unit="Days" value={duration.days} />
      <DurationSegment unit="Hours" value={duration.hours} />
      <DurationSegment unit="Minutes" value={duration.minutes} />
      <DurationSegment unit="Seconds" value={duration.seconds} />
    </div>
  );
}

interface DurationSegmentProps extends WithClassnames {
  unit: string;
  value: number;
}

function DurationSegment({ unit, value, className }: DurationSegmentProps) {
  return (
    <div
      className={joinClassNames(
        'flex flex-col items-center gap-y-1 p-1 lg:px-3',
        'border-overlay-divider/10 rounded-sm border',
        className,
      )}
    >
      <div className="text-text-primary font-title text-xl leading-none lg:text-3xl">
        {formatNumber(value, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      </div>
      <div className="text-text-tertiary text-2xs font-title lg:text-xs">
        {unit}
      </div>
    </div>
  );
}

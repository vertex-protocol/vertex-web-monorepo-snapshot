'use client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Value } from '@vertex-protocol/web-ui';
import { useCountdownDuration } from 'client/hooks/ui/useCountdownDuration';
import { TradingCompetitionStatusBadge } from 'client/modules/tradingCompetition/components/TradingCompetitionStatusBadge';
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

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:gap-x-8">
      <div className="flex flex-col items-center gap-y-2">
        <TradingCompetitionStatusBadge status={currentContestStatus} />
        <span className="text-text-tertiary text-2xs empty:hidden lg:text-xs">
          {title}
        </span>
      </div>
      {endTime && <Countdown endTimeMillis={endTime} />}
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
        'border-overlay-divider rounded-xs border',
        className,
      )}
    >
      <Value sizeVariant="xl" className="title-text">
        {formatNumber(value, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      </Value>
      <div className="text-text-tertiary text-2xs title-text lg:text-xs">
        {unit}
      </div>
    </div>
  );
}

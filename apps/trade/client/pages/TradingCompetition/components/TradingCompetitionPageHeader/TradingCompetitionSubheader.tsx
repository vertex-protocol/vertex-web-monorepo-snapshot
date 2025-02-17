'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Divider,
  formatTimestamp,
  LinkButton,
  TimeFormatSpecifier,
  ValueWithChange,
} from '@vertex-protocol/web-ui';
import { LeaderboardContest } from 'client/hooks/query/tradingCompetition/useLeaderboardContests';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { differenceInDays, formatDuration } from 'date-fns';
import Link from 'next/link';

export function TradingCompetitionSubheader() {
  const {
    currentContest,
    config: { docsHref, rounds },
  } = useTradingCompetitionContext();

  if (!currentContest) {
    return null;
  }

  const numDays = differenceInDays(
    currentContest.endTimeMillis,
    currentContest.startTimeMillis,
  );

  const roundInfo = rounds ? (
    <>
      <span>
        Round{' '}
        <span className="text-text-primary">
          {rounds.current}/{rounds.total}
        </span>
      </span>
      <Divider className="h-3" vertical />
    </>
  ) : null;

  return (
    <div
      className={joinClassNames(
        'flex flex-wrap items-center gap-x-3 gap-y-1',
        'text-text-tertiary whitespace-nowrap text-xs lg:text-sm',
      )}
    >
      <Timeline contest={currentContest} />
      <Divider className="h-3" vertical />
      {roundInfo}
      <div>
        Duration{' '}
        <span className="text-text-primary">
          {formatDuration({ days: numDays })}
        </span>
      </div>
      {/* Hide this divider on mobile, as the following element should be on its own line. */}
      <Divider className="hidden h-3 lg:block" vertical />
      {/*Using `basis-full` to force the link onto its own line on mobile. */}
      <div className="basis-full justify-start lg:basis-auto">
        <LinkButton
          as={Link}
          colorVariant="primary"
          href={docsHref}
          withExternalIcon
          external
        >
          Docs
        </LinkButton>
      </div>
    </div>
  );
}

function Timeline({ contest }: { contest: LeaderboardContest | undefined }) {
  const startMonthDay = formatTimestamp(contest?.startTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D,
  });
  const endMonthDay = formatTimestamp(contest?.endTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D,
  });
  const endHrMin = formatTimestamp(contest?.endTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.HH_MM_12H,
  });

  return (
    <ValueWithChange
      sizeVariant="sm"
      currentValue={
        <span className="text-text-primary text-sm">{startMonthDay}</span>
      }
      newValue={
        <span className="text-sm">
          <span className="text-text-primary">{endMonthDay}</span>{' '}
          <span className="text-text-tertiary">{endHrMin}</span>
        </span>
      }
    />
  );
}

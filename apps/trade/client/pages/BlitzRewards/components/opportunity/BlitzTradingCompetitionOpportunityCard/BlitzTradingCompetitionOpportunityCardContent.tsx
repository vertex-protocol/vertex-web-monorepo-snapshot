'use client';

import { WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton, Value } from '@vertex-protocol/web-ui';
import { Countdown } from 'client/components/Countdown';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { LeaderboardContest } from 'client/hooks/query/tradingCompetition/useLeaderboardContests';
import { TradingCompetitionStatusBadge } from 'client/modules/tradingCompetition/components/TradingCompetitionStatusBadge';
import { useTradingCompetitionData } from 'client/modules/tradingCompetition/hooks/useTradingCompetitionData';
import { PrizePool } from 'client/modules/tradingCompetition/types';
import { BLITZ_TRADING_COMPETITION_ROUTES } from 'client/pages/TradingCompetition/configs/blitz/routes';
import { TRADING_COMPETITION_CONFIGS_BY_KEY } from 'client/pages/TradingCompetition/configs/configs';
import { clientEnv } from 'common/environment/clientEnv';
import Link from 'next/link';

export function BlitzTradingCompetitionOpportunityCardContent({
  className,
}: WithClassnames) {
  const config =
    clientEnv.base.dataEnv === 'blitzMainnet'
      ? TRADING_COMPETITION_CONFIGS_BY_KEY.blitz
      : TRADING_COMPETITION_CONFIGS_BY_KEY.blitzTestnet;

  const { currentContest, currentContestStatus } = useTradingCompetitionData({
    config,
  });

  return (
    <SecondaryButton
      as={Link}
      href={BLITZ_TRADING_COMPETITION_ROUTES.base}
      className={className}
    >
      <CompetitionPrizePool totalPrizePool={config.totalPrizePool} />
      <CompetitionContestStatus
        currentContest={currentContest}
        currentContestStatus={currentContestStatus}
      />
    </SecondaryButton>
  );
}

function CompetitionContestStatus({
  currentContest,
  currentContestStatus,
}: {
  currentContest: LeaderboardContest | undefined;
  currentContestStatus: 'pending' | 'active' | 'done' | undefined;
}) {
  if (!currentContest || !currentContestStatus) {
    return null;
  }

  const { title, endTime } = {
    pending: { title: 'Countdown', endTime: currentContest?.startTimeMillis },
    active: { title: 'Ends in', endTime: currentContest?.endTimeMillis },
    done: { title: undefined, endTime: undefined },
  }[currentContestStatus];

  return (
    <ValueWithLabel.Vertical
      label={
        <>
          <TradingCompetitionStatusBadge status={currentContestStatus} />
          <span className="text-text-tertiary text-xs empty:hidden">
            {title}
          </span>
        </>
      }
      valueClassName="sm:justify-end"
      valueContent={
        endTime && (
          <Countdown
            segmentClassName="text-lg lg:text-xl"
            unitClassName="text-xs lg:text-sm"
            endTimeMillis={endTime}
          />
        )
      }
    />
  );
}

function CompetitionPrizePool({
  totalPrizePool,
}: {
  totalPrizePool: PrizePool;
}) {
  return (
    <ValueWithLabel.Vertical
      label="Prize Pool"
      // To keep value aligned with CompetitionContestStatus Countdown
      className="justify-between"
      valueClassName="flex items-center gap-x-3"
      valueContent={totalPrizePool.map((prizePool, index) => (
        <Value key={index} endElement={prizePool.symbol}>
          {prizePool.amount}
        </Value>
      ))}
    />
  );
}

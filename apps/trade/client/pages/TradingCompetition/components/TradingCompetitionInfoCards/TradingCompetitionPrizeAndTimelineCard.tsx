import { ValueWithChange } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';

export function TradingCompetitionPrizeAndTimelineCard() {
  const { currentContest, currentContestPrizePool } =
    useTradingCompetitionContext();

  const startMonthDay = formatTimestamp(currentContest?.startTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D,
  });
  const startHrMin = formatTimestamp(currentContest?.startTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.HH_MM_12H,
  });
  const endMonthDay = formatTimestamp(currentContest?.endTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D,
  });
  const endHrMin = formatTimestamp(currentContest?.endTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.HH_MM_12H,
  });

  return (
    <TradingCompetitionCard className="flex-col gap-y-4 lg:flex-row lg:gap-x-14">
      <ValueWithLabel.Vertical
        label="Prize Pool"
        valueClassName="gap-x-3"
        valueContent={currentContestPrizePool?.map((prize, i) => (
          <div key={i} className="flex items-baseline gap-x-1">
            <span className="text-xl leading-none lg:text-3xl">
              {prize.amount}
            </span>
            <span className="text-text-tertiary text-sm lg:text-base">
              {prize.symbol}
            </span>
          </div>
        ))}
      />
      <ValueWithLabel.Vertical
        label="Start & End"
        valueClassName="flex-1"
        valueContent={
          <ValueWithChange
            sizeVariant="sm"
            className="gap-x-2"
            currentValue={
              <span>
                <span className="text-text-primary">{startMonthDay}</span>{' '}
                <span className="text-text-tertiary">{startHrMin}</span>
              </span>
            }
            newValue={
              <span>
                <span className="text-text-primary">{endMonthDay}</span>{' '}
                <span className="text-text-tertiary">{endHrMin}</span>
              </span>
            }
          />
        }
      />
    </TradingCompetitionCard>
  );
}

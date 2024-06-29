import { Divider } from '@vertex-protocol/web-ui';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionPeriodHeading() {
  const {
    config: { hasPeriods, periodLabel },
    currentPeriod,
  } = useTradingCompetitionContext();

  if (!hasPeriods) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-10">
      <span className="text-text-primary whitespace-nowrap text-lg lg:text-xl">
        {periodLabel} {currentPeriod}
      </span>
      <Divider />
    </div>
  );
}

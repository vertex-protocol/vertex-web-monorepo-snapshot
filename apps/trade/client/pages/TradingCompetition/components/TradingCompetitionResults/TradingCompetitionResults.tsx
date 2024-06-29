import { TradingCompetitionPeriodSelect } from 'client/pages/TradingCompetition/components/TradingCompetitionResults/TradingCompetitionPeriodSelect';
import { TradingCompetitionTable } from 'client/pages/TradingCompetition/components/TradingCompetitionResults/TradingCompetitionTable';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import React, { useEffect, useState } from 'react';

export function TradingCompetitionResults() {
  const {
    config: { hasPeriods },
    currentPeriod,
  } = useTradingCompetitionContext();

  const [period, setPeriod] = useState(currentPeriod);

  // `currentPeriod` resolves async, so we need to update state if necessary.
  useEffect(() => {
    setPeriod(currentPeriod);
  }, [currentPeriod]);

  if (!period) {
    return null;
  }

  return (
    <div>
      {/* Checking `hasPeriods` here may be a bit redundant but have added it just to be safe. */}
      {hasPeriods && currentPeriod !== 1 && (
        <div className="flex items-center justify-end gap-x-1.5 pl-3 text-xs">
          Display:
          <TradingCompetitionPeriodSelect
            period={period}
            setPeriod={setPeriod}
          />
        </div>
      )}
      <TradingCompetitionTable period={period} />
    </div>
  );
}

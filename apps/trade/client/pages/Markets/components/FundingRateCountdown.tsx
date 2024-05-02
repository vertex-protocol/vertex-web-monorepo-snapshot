import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { useNextFundingTime } from 'client/modules/trading/hooks/useNextFundingTime';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';

export function FundingRateCountdown({ className }: WithClassnames) {
  const { millisToNextFunding } = useNextFundingTime();
  const countdown = formatTimestamp(millisToNextFunding, {
    formatSpecifier: TimeFormatSpecifier.MM_SS,
  });

  return (
    <div className={joinClassNames('flex gap-1.5', className)}>
      <span>Next Payment</span>
      <span className="text-accent min-w-10">{countdown}</span>
    </div>
  );
}

import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { useNextFundingTime } from 'client/modules/trading/hooks/useNextFundingTime';
import {
  formatDurationMillis,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';

export function FundingRateCountdown({ className }: WithClassnames) {
  const { millisToNextFunding } = useNextFundingTime();
  const countdown = formatDurationMillis(millisToNextFunding, {
    formatSpecifier: TimeFormatSpecifier.MM_SS,
  });

  return (
    <div className={joinClassNames('flex gap-1.5', className)}>
      <span>Next Payment</span>
      <span className="text-accent min-w-10">{countdown}</span>
    </div>
  );
}

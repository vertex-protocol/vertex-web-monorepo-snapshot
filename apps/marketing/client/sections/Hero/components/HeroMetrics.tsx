import { WithClassnames } from '@vertex-protocol/web-common';
import classNames from 'classnames';

export function HeroMetrics({ className }: WithClassnames) {
  return (
    <div
      className={classNames(
        'flex justify-center gap-x-8',
        'md:gap-x-20',
        'lg:gap-x-28',
        'xl:gap-x-32',
        className,
      )}
    >
      <StackedMetric label="Total Volume" value="$80B+" />
      <StackedMetric label="Total Markets" value="45+" />
      <StackedMetric label="Number of Traders" value="25k+" />
    </div>
  );
}

function StackedMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-y-1 md:gap-y-1.5">
      <span className="text-white-700 font-dmSans text-xs sm:text-sm md:text-base xl:text-lg">
        {label}
      </span>
      <span className="xs:text-xl font-sans text-xl font-bold leading-tight text-white sm:text-2xl md:text-4xl xl:text-6xl">
        {value}
      </span>
    </div>
  );
}

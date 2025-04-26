import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import {
  ChartTimespanRadioGroup,
  ChartTimespanRadioGroupOption,
} from 'client/modules/charts/components/ChartTimespanRadioGroup';
import { HistoricalInterestRateChartTimespan } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/types';
import { Dispatch, SetStateAction } from 'react';

const TIMESPAN_OPTIONS: ChartTimespanRadioGroupOption<HistoricalInterestRateChartTimespan>[] =
  [
    {
      label: '24h',
      value: '24h',
    },
    {
      label: '7d',
      value: '7d',
    },
    {
      label: '30d',
      value: '30d',
    },
  ];

interface Props extends WithClassnames {
  timespan: HistoricalInterestRateChartTimespan;
  setTimespan: Dispatch<SetStateAction<HistoricalInterestRateChartTimespan>>;
  isDeposit: boolean;
  setIsDeposit: (isDeposit: boolean) => void;
}

export function HistoricalInterestRateChartTopBar({
  className,
  timespan,
  setTimespan,
  isDeposit,
  setIsDeposit,
}: Props) {
  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-2',
        'sm:flex-row sm:items-center sm:justify-between sm:gap-x-4',
        className,
      )}
    >
      <SegmentedControl.Container>
        <SegmentedControl.Button
          className="flex-1"
          size="xs"
          active={isDeposit}
          onClick={() => setIsDeposit(true)}
        >
          Deposit
        </SegmentedControl.Button>
        <SegmentedControl.Button
          className="flex-1"
          size="xs"
          active={!isDeposit}
          onClick={() => setIsDeposit(false)}
        >
          Borrow
        </SegmentedControl.Button>
      </SegmentedControl.Container>
      <ChartTimespanRadioGroup
        timespan={timespan}
        setTimespan={setTimespan}
        timespanOptions={TIMESPAN_OPTIONS}
        className="self-end sm:self-auto"
      />
    </div>
  );
}

import { TimeInSeconds } from '@vertex-protocol/client';
import { useSelect } from '@vertex-protocol/web-ui';
import { useMemo, useState } from 'react';

const TIMEFRAME_OPTIONS = [
  {
    label: 'All Time',
    value: 'all_time',
  },
  {
    label: 'Past 30 Days',
    value: 'past_30_days',
  },
  {
    label: 'Past 60 Days',
    value: 'past_60_days',
  },
  {
    label: 'Past 90 Days',
    value: 'past_90_days',
  },
] as const;

export type PoolsPnlTimeframeID = (typeof TIMEFRAME_OPTIONS)[number]['value'];

export function useSubaccountPoolsPnlTimeframeSelect() {
  const [selectedPoolsPnlTimeframe, setSelectedPoolsPnlTimeframe] =
    useState<PoolsPnlTimeframeID>(TIMEFRAME_OPTIONS[0].value);

  const {
    open,
    onOpenChange,
    selectOptions,
    value,
    selectedOption,
    onValueChange,
  } = useSelect({
    onSelectedValueChange: setSelectedPoolsPnlTimeframe,
    selectedValue: selectedPoolsPnlTimeframe,
    options: TIMEFRAME_OPTIONS,
  });

  return useMemo(() => {
    const secondsBeforeNow = (() => {
      switch (selectedPoolsPnlTimeframe) {
        case 'past_30_days':
          return [0, 30 * TimeInSeconds.DAY];
        case 'past_60_days':
          return [0, 60 * TimeInSeconds.DAY];
        case 'past_90_days':
          return [0, 90 * TimeInSeconds.DAY];
        case 'all_time':
          return [0];
      }
    })();

    return {
      poolsPnlSecondsBeforeNow: secondsBeforeNow,
      open,
      onOpenChange,
      selectOptions,
      value,
      selectedOption,
      onValueChange,
    };
  }, [
    onOpenChange,
    onValueChange,
    open,
    selectOptions,
    selectedOption,
    selectedPoolsPnlTimeframe,
    value,
  ]);
}

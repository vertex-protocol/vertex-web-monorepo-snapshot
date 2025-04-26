import {
  Select,
  SelectOption,
  UpDownChevronIcon,
  useSelect,
} from '@vertex-protocol/web-ui';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { HistoryExportType } from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import { useMemo } from 'react';

interface Props {
  selectedValue: HistoryExportType;
  onSelectedValueChange: (table: HistoryExportType) => void;
}

export function ExportHistoryTypeSelect({
  selectedValue,
  onSelectedValueChange,
}: Props) {
  const { isVlpEnabled } = useEnabledFeatures();
  const options = useMemo<SelectOption<HistoryExportType>[]>(
    () => [
      {
        value: 'trades',
        label: 'Trades',
      },
      {
        value: 'realized_pnl',
        label: 'Realized PnL',
      },
      {
        value: 'deposits',
        label: 'Deposits',
      },
      {
        value: 'withdrawals',
        label: 'Withdrawals',
      },
      {
        value: 'transfers',
        label: 'Transfers',
      },
      {
        value: 'lp',
        label: 'Pools',
      },
      ...(isVlpEnabled
        ? [
            {
              value: 'vlp' as HistoryExportType,
              label: 'VLP',
            },
          ]
        : []),
      {
        value: 'liquidations',
        label: 'Liquidations',
      },
      {
        value: 'funding',
        label: 'Funding',
      },
      {
        value: 'interest',
        label: 'Interest',
      },
    ],
    [isVlpEnabled],
  );
  const {
    open,
    onOpenChange,
    selectOptions,
    value,
    selectedOption,
    onValueChange,
  } = useSelect({
    onSelectedValueChange,
    selectedValue,
    options,
  });

  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="text-sm"
        endIcon={<UpDownChevronIcon open={open} size={14} />}
      >
        {selectedOption?.label ?? 'Select'}
      </Select.Trigger>
      <Select.Options
        align="end"
        className="min-w-36"
        viewportClassName="max-h-72"
      >
        {selectOptions.map((option) => (
          <Select.Option value={option.value} key={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}

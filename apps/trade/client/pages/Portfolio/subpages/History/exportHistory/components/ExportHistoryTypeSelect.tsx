import {
  Select,
  SelectOption,
  UpDownChevronIcon,
  useSelect,
} from '@vertex-protocol/web-ui';
import { HistoryExportType } from 'client/pages/Portfolio/subpages/History/exportHistory/types';

interface Props {
  selectedValue: HistoryExportType;
  onSelectedValueChange: (table: HistoryExportType) => void;
}

const OPTIONS: SelectOption<HistoryExportType>[] = [
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
  {
    value: 'liquidations',
    label: 'Liquidations',
  },
];

export function ExportHistoryTypeSelect({
  selectedValue,
  onSelectedValueChange,
}: Props) {
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
    options: OPTIONS,
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
      <Select.Options className="min-w-36" align="end">
        {selectOptions.map((option) => (
          <Select.Option value={option.value} key={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}

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

const OPTIONS: SelectOption<HistoryExportType, HistoryExportType>[] = [
  {
    id: 'trades',
    value: 'trades',
    label: 'Trades',
  },
  {
    id: 'realized_pnl',
    value: 'realized_pnl',
    label: 'Realized PnL',
  },
  {
    id: 'deposits',
    value: 'deposits',
    label: 'Deposits',
  },
  {
    id: 'withdrawals',
    value: 'withdrawals',
    label: 'Withdrawals',
  },
  {
    id: 'transfers',
    value: 'transfers',
    label: 'Transfers',
  },
  {
    id: 'lp',
    value: 'lp',
    label: 'Pools',
  },
  {
    id: 'liquidations',
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

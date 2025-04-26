import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Select, UpDownChevronIcon, UseSelect } from '@vertex-protocol/web-ui';
import { PoolsPnlTimeframeID } from 'client/pages/Pools/components/SubaccountPoolsMetricsCards/useSubaccountPoolsPnlTimeframeSelect';

interface Props extends WithClassnames, UseSelect<PoolsPnlTimeframeID> {}

export function SubaccountPoolsPnlTimeframeSelect({
  className,
  value,
  onOpenChange,
  onValueChange,
  open,
  selectedOption,
  selectOptions,
}: Props) {
  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className={joinClassNames('gap-x-1', className)}
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

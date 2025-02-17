import { Select, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { useFundingRatePeriodSelect } from 'client/pages/Markets/hooks/useFundingRatePeriodSelect';

export function FundingRatePeriodSelect() {
  const {
    fundingRatePeriod,
    selectOptions,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useFundingRatePeriodSelect();

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="border-stroke min-w-28 rounded border bg-transparent capitalize"
        endIcon={<UpDownChevronIcon open={open} />}
        // This prevents sorting icon from being clicked
        onClick={(e) => e.stopPropagation()}
      >
        {fundingRatePeriod}
      </Select.Trigger>
      <Select.Options>
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value} className="capitalize">
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}

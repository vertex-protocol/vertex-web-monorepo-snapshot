import {
  Select,
  SelectOption,
  UpDownChevronIcon,
  useSelect,
} from '@vertex-protocol/web-ui';
import {
  VLP_OVERVIEW_CARD_TIMESPAN_METADATA,
  VlpOverviewCardTimespan,
} from 'client/pages/Vlp/components/VlpOverviewCard/vlpOverviewCardTimespan';

interface Props {
  selectedTimespan: VlpOverviewCardTimespan;
  setSelectedTimespan: (timespan: VlpOverviewCardTimespan) => void;
}

const TIMESPAN_OPTIONS = Object.entries(
  VLP_OVERVIEW_CARD_TIMESPAN_METADATA,
).map(([timespan, metadata]) => {
  return {
    value: timespan as VlpOverviewCardTimespan,
    label: metadata.label,
  };
}) satisfies SelectOption<VlpOverviewCardTimespan>[];

export function VlpOverviewTimespanSelect({
  selectedTimespan,
  setSelectedTimespan,
}: Props) {
  const {
    value,
    open,
    onValueChange,
    onOpenChange,
    selectedOption,
    selectOptions,
  } = useSelect({
    options: TIMESPAN_OPTIONS,
    selectedValue: selectedTimespan,
    onSelectedValueChange: setSelectedTimespan,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger endIcon={<UpDownChevronIcon open={open} />}>
        {selectedOption?.label ?? 'Select'}
      </Select.Trigger>
      <Select.Options className="w-24" align="end">
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}

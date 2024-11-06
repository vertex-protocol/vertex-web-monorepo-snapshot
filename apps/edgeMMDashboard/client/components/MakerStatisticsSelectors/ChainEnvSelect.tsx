import { ChainEnv } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Label,
  Select,
  SelectOption,
  useSelect,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';

interface Props {
  setPrimaryChainEnv: (value: ChainEnv) => void;
  primaryChainEnv: ChainEnv;
  chainEnvOptions: SelectOption<string, ChainEnv>[];
}

export function ChainEnvSelect({
  setPrimaryChainEnv,
  primaryChainEnv,
  chainEnvOptions,
}: Props) {
  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: primaryChainEnv,
    onSelectedValueChange: (option) => setPrimaryChainEnv(option),
    options: chainEnvOptions,
  });

  // min-w used to prevent layout shifts. It's shared between trigger and options to keep them aligned.
  const sharedClassNames = 'min-w-32';

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-y-1">
        <Label>Chain Env</Label>
        <Select.Trigger
          className={sharedClassNames}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          {selectedOption?.label}
        </Select.Trigger>
      </div>
      <Select.Options
        className={
          // max-h to make it scrollable and prevent going off screen
          joinClassNames(sharedClassNames, 'max-h-80')
        }
      >
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}

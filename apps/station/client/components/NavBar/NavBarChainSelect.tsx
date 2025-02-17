import { ChainEnv } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import {
  Select,
  SelectOption,
  UpDownChevronIcon,
  useSelect,
} from '@vertex-protocol/web-ui';

const CHAIN_OPTIONS: SelectOption<ChainEnv>[] = [
  {
    value: 'arbitrum',
    label: 'Arbitrum',
  },
  {
    value: 'blast',
    label: 'Blast',
  },
  {
    value: 'mantle',
    label: 'Mantle',
  },
  {
    value: 'sei',
    label: 'Sei',
  },
  {
    value: 'base',
    label: 'Base',
  },
  {
    value: 'sonic',
    label: 'Sonic',
  },
  {
    value: 'abstract',
    label: 'Abstract',
  },
  {
    value: 'arbitrumTestnet',
    label: 'Arbitrum Testnet',
  },
  {
    value: 'blastTestnet',
    label: 'Blast Testnet',
  },
  {
    value: 'mantleTestnet',
    label: 'Mantle Testnet',
  },
  {
    value: 'seiTestnet',
    label: 'Sei Testnet',
  },
  {
    value: 'baseTestnet',
    label: 'Base Testnet',
  },
  {
    value: 'sonicTestnet',
    label: 'Sonic Testnet',
  },
  {
    value: 'abstractTestnet',
    label: 'Abstract Testnet',
  },
];

export function NavBarChainSelect() {
  const { primaryChainEnv, setPrimaryChainEnv } = useEVMContext();
  const {
    onOpenChange,
    onValueChange,
    open,
    selectOptions,
    selectedOption,
    value,
  } = useSelect({
    options: CHAIN_OPTIONS,
    selectedValue: primaryChainEnv,
    onSelectedValueChange: setPrimaryChainEnv,
  });

  return (
    <Select.Root
      value={value}
      open={open}
      onOpenChange={onOpenChange}
      onValueChange={onValueChange}
    >
      <Select.Trigger endIcon={<UpDownChevronIcon open={open} />}>
        {selectedOption?.label ?? 'Select'}
      </Select.Trigger>
      <Select.Options>
        {selectOptions.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}

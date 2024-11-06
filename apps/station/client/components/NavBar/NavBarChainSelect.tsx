import { ChainEnv } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import {
  Select,
  SelectOption,
  UpDownChevronIcon,
  useSelect,
} from '@vertex-protocol/web-ui';

const CHAIN_OPTIONS: SelectOption<ChainEnv, ChainEnv>[] = [
  {
    id: 'arbitrum',
    value: 'arbitrum',
    label: 'Arbitrum',
  },
  {
    id: 'blast',
    value: 'blast',
    label: 'Blast',
  },
  {
    id: 'mantle',
    value: 'mantle',
    label: 'Mantle',
  },
  {
    id: 'sei',
    value: 'sei',
    label: 'Sei',
  },
  {
    id: 'base',
    value: 'base',
    label: 'Base',
  },
  {
    id: 'arbitrumTestnet',
    value: 'arbitrumTestnet',
    label: 'Arbitrum Testnet',
  },
  {
    id: 'blastTestnet',
    value: 'blastTestnet',
    label: 'Blast Testnet',
  },
  {
    id: 'mantleTestnet',
    value: 'mantleTestnet',
    label: 'Mantle Testnet',
  },
  {
    id: 'seiTestnet',
    value: 'seiTestnet',
    label: 'Sei Testnet',
  },
  {
    id: 'baseTestnet',
    value: 'baseTestnet',
    label: 'Base Testnet',
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

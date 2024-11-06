import { Select, SelectOption, useSelect } from '@vertex-protocol/web-ui';
import { BridgeSelect } from 'client/modules/collateral/bridge/components/BridgeSelect/BridgeSelect';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import { BridgeChain } from 'client/modules/collateral/bridge/types';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  selectedSourceChain: BridgeChain | undefined;
  allSourceChains: BridgeChain[];
  form: UseFormReturn<BridgeFormValues>;
}

type ChainSelectOption = SelectOption<string, BridgeChain>;

export function SourceChainSelect({
  allSourceChains,
  selectedSourceChain,
  form,
}: Props) {
  // Options for select dropdown
  const options = useMemo(() => {
    return allSourceChains.map((chain): ChainSelectOption => {
      return {
        id: chain.chainId.toFixed(),
        label: chain.chainName,
        value: chain,
      };
    });
  }, [allSourceChains]);

  const { open, onOpenChange, value, onValueChange, selectOptions } = useSelect(
    {
      selectedValue: selectedSourceChain,
      onSelectedValueChange: (newChain) => {
        form.setValue('sourceChainId', newChain.chainId);
        form.setValue('sourceTokenAddress', '');
        form.resetField('amount');
      },
      options,
    },
  );

  const disabled = allSourceChains.length === 0;
  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      <BridgeSelect.Trigger
        open={open}
        title="Chain:"
        label={selectedSourceChain?.chainName}
        labelImgSrc={selectedSourceChain?.externalIconUrl}
        disabled={disabled}
      />
      <BridgeSelect.Options>
        {selectOptions.map((option) => (
          <BridgeSelect.Option option={option} key={option.label} />
        ))}
      </BridgeSelect.Options>
    </Select.Root>
  );
}

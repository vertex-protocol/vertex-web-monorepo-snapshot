import { useSelect } from '@vertex-protocol/web-ui';
import { BridgeSelect } from 'client/modules/collateral/bridge/components/BridgeSelect/BridgeSelect';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import { BridgeChainSelectValue } from 'client/modules/collateral/bridge/types';
import { useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  selectedSourceChain: BridgeChainSelectValue | undefined;
  allSourceChains: BridgeChainSelectValue[];
  form: UseFormReturn<BridgeFormValues>;
}

export function SourceChainSelect({
  allSourceChains,
  selectedSourceChain,
  form,
}: Props) {
  // Options for select dropdown
  const options = useMemo(() => {
    return allSourceChains.map((chain) => {
      return {
        label: chain.chainName,
        value: chain,
      };
    });
  }, [allSourceChains]);

  const onSelectedValueChange = useCallback(
    (newChain: BridgeChainSelectValue) => {
      form.setValue('sourceChainId', newChain.chainId);
      form.setValue('sourceTokenAddress', '');
      form.resetField('amount');
    },
    [form],
  );

  const { open, onOpenChange, value, onValueChange, selectOptions } = useSelect(
    {
      selectedValue: selectedSourceChain,
      onSelectedValueChange,
      options,
    },
  );

  const disabled = allSourceChains.length === 0;
  return (
    <BridgeSelect.Root
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
    </BridgeSelect.Root>
  );
}

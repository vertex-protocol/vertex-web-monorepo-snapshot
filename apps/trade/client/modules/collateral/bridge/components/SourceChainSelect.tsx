import { joinClassNames } from '@vertex-protocol/web-common';
import { Select, SelectOption, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/useBridgeForm/types';
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
  const sourceChainOptions = useMemo(() => {
    return allSourceChains.map((chain): ChainSelectOption => {
      return {
        id: chain.chainId.toFixed(),
        label: chain.chainName,
        value: chain,
      };
    });
  }, [allSourceChains]);

  const { selectOptions, onOpenChange, onValueChange, open, value } = useSelect(
    {
      defaultOpen: false,
      onSelectedValueChange: (newChain) => {
        form.setValue('sourceChainId', newChain.chainId);
        form.setValue('sourceTokenAddress', '');
        form.resetField('amount');
      },
      options: sourceChainOptions,
      selectedValue: selectedSourceChain,
    },
  );

  const triggerContent = selectedSourceChain ? (
    <div className="flex items-center gap-x-2">
      {/*Loading remote images, so can't use Image component*/}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={selectedSourceChain.externalIconUrl}
        alt={selectedSourceChain.chainName}
        className="h-4 w-4"
      />
      <span>{selectedSourceChain.chainName}</span>
    </div>
  ) : (
    'Select'
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
      <Select.Trigger
        endIcon={<UpDownChevronIcon open={open} size={16} />}
        className={joinClassNames(
          'rounded-full text-sm',
          disabled
            ? 'text-disabled bg-surface-1'
            : 'text-text-primary bg-surface-2',
        )}
        stateClassNameOverrides="before:rounded-full"
        disabled={disabled}
      >
        {triggerContent}
      </Select.Trigger>
      <Select.Options
        // Same width as collateral dropdown
        className="flex max-h-96 min-w-[288px] flex-col gap-y-2 p-2"
        // Aligns start of the options panel to roughly the left edge of the dialog
        alignOffset={-94}
        sideOffset={12}
      >
        {selectOptions.map((chain) => {
          return (
            <Select.Option
              value={chain.value}
              key={chain.value}
              className="p-2"
            >
              <div className="flex items-center gap-x-4">
                {/*Loading remote images, so can't use Image component*/}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={chain.value}
                  src={chain.original.externalIconUrl}
                  className="h-6 w-6"
                />
                <span className="text-text-primary text-sm">{chain.label}</span>
              </div>
            </Select.Option>
          );
        })}
      </Select.Options>
    </Select.Root>
  );
}

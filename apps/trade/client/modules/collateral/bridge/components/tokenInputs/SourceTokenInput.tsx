import { BigDecimal } from '@vertex-protocol/client';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { SearchBar } from 'client/components/SearchBar';
import {
  Select,
  useSelect,
  SelectOption,
  SelectComponentOption,
} from '@vertex-protocol/web-ui';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { BridgeTokenInput } from 'client/modules/collateral/bridge/components/tokenInputs/BridgeTokenInput';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/useBridgeForm/types';
import {
  BridgeChain,
  BridgeToken,
} from 'client/modules/collateral/bridge/types';
import { ReactNode, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<BridgeFormValues>;
  error: ReactNode;
  selectedSourceChain: BridgeChain | undefined;
  selectedSourceToken: BridgeToken | undefined;
  estimatedValueUsd: BigDecimal | undefined;
  allSourceTokens: BridgeToken[];
  validateAmount: InputValidatorFn<string>;
}

function getSearchString(option: SelectComponentOption<BridgeToken>) {
  return `${option.original.symbol} ${option.original.name}`;
}

export function SourceTokenInput({
  form,
  error,
  selectedSourceToken,
  allSourceTokens,
  selectedSourceChain,
  estimatedValueUsd,
  validateAmount,
}: Props) {
  const disabled = !selectedSourceChain || allSourceTokens.length === 0;

  const options = useMemo((): SelectOption<string, BridgeToken>[] => {
    return allSourceTokens.map((token) => {
      return {
        // ID's must be unique, but addresses are shared between different source chains for native tokens (see nativeTokenConstant)
        // so we need to prefix with the chain ID
        id: `${token.chainId}_${token.address}`,
        label: token.symbol,
        value: token,
      };
    });
  }, [allSourceTokens]);

  const { open, onOpenChange, selectOptions, value, onValueChange } = useSelect(
    {
      defaultOpen: false,
      selectedValue: selectedSourceToken,
      onSelectedValueChange: (newToken) => {
        form.setValue('sourceTokenAddress', newToken.address);
        form.resetField('amount');
      },
      options,
    },
  );

  const [query, setQuery] = useState('');

  /**
   * There is a known issue on mobile here. If we have a selection, then use
   * search and the selected item is filtered out, the input is blurred. This results
   * in the keyboard on mobile being auto-dismissed
   */
  const { results } = useTextSearch({
    query,
    items: selectOptions,
    getSearchString,
  });

  return (
    <BridgeTokenInput.Container error={error}>
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <BridgeTokenInput.SelectTrigger
          open={open}
          selectedToken={
            selectedSourceToken
              ? {
                  iconUrl: selectedSourceToken.externalIconUrl,
                  symbol: selectedSourceToken.symbol,
                }
              : undefined
          }
          disabled={disabled}
        />
        <BridgeTokenInput.SelectOptions
          header={
            <SearchBar
              iconSize={16}
              query={query}
              setQuery={setQuery}
              className="py-1"
            />
          }
        >
          {results.map((option) => {
            const token = option.original;
            return (
              <BridgeTokenInput.SelectOption
                isSelected={option.value === value}
                key={token.address}
                symbol={token.symbol}
                iconUrl={token.externalIconUrl}
                optionValue={option.value}
              />
            );
          })}
        </BridgeTokenInput.SelectOptions>
      </Select.Root>
      <BridgeTokenInput.Input
        isError={!!error}
        disabled={disabled}
        {...form.register('amount', {
          validate: validateAmount,
        })}
        onFocus={() => {
          form.setValue('amountSource', 'absolute');
        }}
        estimatedValueUsd={estimatedValueUsd}
      />
    </BridgeTokenInput.Container>
  );
}

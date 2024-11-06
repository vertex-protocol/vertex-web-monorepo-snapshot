import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import { BridgeToken } from 'client/modules/collateral/bridge/types';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BridgeComboBox } from 'client/modules/collateral/bridge/components/BridgeSelect/BridgeComboBox';
import { ComboBox } from 'client/components/ComboBox/ComboBox';
import {
  ComboBoxComponentOption,
  ComboBoxOption,
} from 'client/components/ComboBox/hooks/types';
import { useComboBox } from 'client/components/ComboBox/hooks/useComboBox';

interface Props {
  selectedToken: BridgeToken | undefined;
  allTokens: BridgeToken[];
  form: UseFormReturn<BridgeFormValues>;
  disabled?: boolean;
}

function getSearchString(option: ComboBoxComponentOption<BridgeToken>) {
  return `${option.original.symbol} ${option.original.name}`;
}

export function SourceTokenSelect({
  allTokens,
  selectedToken,
  disabled,
  form,
}: Props) {
  const options = useMemo((): ComboBoxOption<string, BridgeToken>[] => {
    return allTokens.map((token) => {
      return {
        // ID's must be unique, but addresses are shared between different source chains for native tokens (see nativeTokenConstant)
        // so we need to prefix with the chain ID
        id: `${token.chainId}_${token.address}`,
        label: token.symbol,
        value: token,
      };
    });
  }, [allTokens]);

  const {
    query,
    setQuery,
    open,
    onOpenChange,
    selectOptions,
    value,
    onValueChange,
  } = useComboBox({
    selectedValue: selectedToken,
    onSelectedValueChange: (newToken) => {
      form.setValue('sourceTokenAddress', newToken.address);
      form.resetField('amount');
    },
    options,
  });

  const { results } = useTextSearch({
    query,
    items: selectOptions,
    getSearchString,
  });

  return (
    <ComboBox.Root open={open} onOpenChange={onOpenChange}>
      <BridgeComboBox.Trigger
        title="Asset:"
        label={selectedToken?.symbol}
        labelImgSrc={selectedToken?.externalIconUrl}
        disabled={disabled}
        open={open}
      />
      <BridgeComboBox.Options
        query={query}
        setQuery={setQuery}
        align="end"
        searchBarPlaceholder="Search Tokens"
      >
        {results.map((option) => (
          <BridgeComboBox.Option
            option={option}
            key={option.original.address}
            onValueChange={onValueChange}
            isSelected={option.value === value}
          />
        ))}
      </BridgeComboBox.Options>
    </ComboBox.Root>
  );
}

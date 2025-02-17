import { ComboBoxComponentOption } from 'client/components/ComboBox/hooks/types';
import { useComboBox } from 'client/components/ComboBox/hooks/useComboBox';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { BridgeComboBox } from 'client/modules/collateral/bridge/components/BridgeSelect/BridgeComboBox';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import { BridgeTokenSelectValue } from 'client/modules/collateral/bridge/types';
import { useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  selectedToken: BridgeTokenSelectValue | undefined;
  allTokens: BridgeTokenSelectValue[];
  form: UseFormReturn<BridgeFormValues>;
  disabled?: boolean;
}

function getSearchString(
  option: ComboBoxComponentOption<BridgeTokenSelectValue>,
) {
  return `${option.original.symbol} ${option.original.name}`;
}

export function SourceTokenSelect({
  allTokens,
  selectedToken,
  disabled,
  form,
}: Props) {
  const options = useMemo(() => {
    return allTokens.map((token) => {
      return {
        label: token.symbol,
        value: token,
      };
    });
  }, [allTokens]);

  const onSelectedValueChange = useCallback(
    (newToken: BridgeTokenSelectValue) => {
      form.setValue('sourceTokenAddress', newToken.address);
      form.resetField('amount');
    },
    [form],
  );

  const {
    selectedOption,
    query,
    setQuery,
    open,
    value,
    onOpenChange,
    selectOptions,
    onValueChange,
  } = useComboBox({
    selectedValue: selectedToken,
    onSelectedValueChange,
    options,
  });

  const { results } = useTextSearch({
    query,
    items: selectOptions,
    getSearchString,
  });

  return (
    <BridgeComboBox.Root open={open} onOpenChange={onOpenChange}>
      <BridgeComboBox.Trigger
        title="Asset:"
        label={selectedOption?.value.symbol}
        labelImgSrc={selectedOption?.value.externalIconUrl}
        disabled={disabled}
        open={open}
      />
      <BridgeComboBox.Options
        query={query}
        value={value}
        setQuery={setQuery}
        onValueChange={onValueChange}
        align="end"
        searchBarPlaceholder="Search Tokens"
      >
        {results.map((option) => (
          <BridgeComboBox.Option
            option={option}
            key={option.original.address}
            onValueChange={onValueChange}
          />
        ))}
      </BridgeComboBox.Options>
    </BridgeComboBox.Root>
  );
}

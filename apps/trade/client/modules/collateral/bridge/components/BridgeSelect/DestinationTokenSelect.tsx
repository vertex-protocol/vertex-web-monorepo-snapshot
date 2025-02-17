import { useSelect } from '@vertex-protocol/web-ui';
import { BridgeSelect } from 'client/modules/collateral/bridge/components/BridgeSelect/BridgeSelect';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import { DestinationBridgeTokenSelectValue } from 'client/modules/collateral/bridge/types';
import { useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<BridgeFormValues>;
  selectedDestinationToken: DestinationBridgeTokenSelectValue | undefined;
  allDestinationTokens: DestinationBridgeTokenSelectValue[];
  disabled?: boolean;
}

export function DestinationTokenSelect({
  form,
  selectedDestinationToken,
  allDestinationTokens,
  disabled,
}: Props) {
  const options = useMemo(() => {
    return allDestinationTokens.map((token) => {
      return {
        label: token.vertexProduct.metadata.token.symbol,
        value: token,
      };
    });
  }, [allDestinationTokens]);

  const onSelectedValueChange = useCallback(
    (newToken: DestinationBridgeTokenSelectValue) => {
      form.setValue('destinationTokenAddress', newToken.address);
    },
    [form],
  );

  const { open, onOpenChange, selectOptions, value, onValueChange } = useSelect(
    {
      selectedValue: selectedDestinationToken,
      onSelectedValueChange,
      options,
    },
  );

  const selectedVertexProductToken =
    selectedDestinationToken?.vertexProduct.metadata.token;

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
        title="Asset:"
        label={selectedVertexProductToken?.symbol}
        labelImgSrc={selectedDestinationToken?.externalIconUrl}
        disabled={disabled}
      />
      <BridgeSelect.Options>
        {selectOptions.map((option) => (
          <BridgeSelect.Option option={option} key={option.original.address} />
        ))}
      </BridgeSelect.Options>
    </BridgeSelect.Root>
  );
}

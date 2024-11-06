import { Select, SelectOption, useSelect } from '@vertex-protocol/web-ui';
import { BridgeSelect } from 'client/modules/collateral/bridge/components/BridgeSelect/BridgeSelect';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import { DestinationBridgeToken } from 'client/modules/collateral/bridge/types';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<BridgeFormValues>;
  selectedDestinationToken: DestinationBridgeToken | undefined;
  allDestinationTokens: DestinationBridgeToken[];
  disabled?: boolean;
}

type TokenSelectOption = SelectOption<string, DestinationBridgeToken>;

export function DestinationTokenSelect({
  form,
  selectedDestinationToken,
  allDestinationTokens,
  disabled,
}: Props) {
  const options = useMemo(() => {
    return allDestinationTokens.map((token): TokenSelectOption => {
      const vertexProductToken = token.vertexProduct.metadata.token;

      return {
        id: vertexProductToken.address,
        label: vertexProductToken.symbol,
        value: token,
      };
    });
  }, [allDestinationTokens]);

  const { open, onOpenChange, selectOptions, value, onValueChange } = useSelect(
    {
      selectedValue: selectedDestinationToken,
      onSelectedValueChange: (newToken) => {
        form.setValue('destinationTokenAddress', newToken.address);
      },
      options,
    },
  );

  const selectedVertexProductToken =
    selectedDestinationToken?.vertexProduct.metadata.token;

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
    </Select.Root>
  );
}

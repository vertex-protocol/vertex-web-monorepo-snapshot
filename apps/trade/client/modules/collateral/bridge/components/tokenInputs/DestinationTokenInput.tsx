import { BigDecimal } from '@vertex-protocol/utils';
import { Select, useSelect, SelectOption } from '@vertex-protocol/web-ui';
import { BridgeTokenInput } from 'client/modules/collateral/bridge/components/tokenInputs/BridgeTokenInput';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/useBridgeForm/types';
import { DestinationBridgeToken } from 'client/modules/collateral/bridge/types';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<BridgeFormValues>;
  selectedDestinationToken: DestinationBridgeToken | undefined;
  allDestinationTokens: DestinationBridgeToken[];
  estimatedReceiveAmount: BigDecimal | undefined;
  estimatedReceiveValueUsd: BigDecimal | undefined;
}

export function DestinationTokenInput({
  form,
  selectedDestinationToken,
  allDestinationTokens,
  estimatedReceiveAmount,
  estimatedReceiveValueUsd,
}: Props) {
  const options = useMemo((): SelectOption<
    string,
    DestinationBridgeToken
  >[] => {
    return allDestinationTokens.map((token) => {
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
      defaultOpen: false,
      selectedValue: selectedDestinationToken,
      onSelectedValueChange: (newToken) => {
        form.setValue('destinationTokenAddress', newToken.address);
      },
      options,
    },
  );

  const selectedVertexProductToken =
    selectedDestinationToken?.vertexProduct.metadata.token;

  const disableSelect = allDestinationTokens.length === 0;

  return (
    <BridgeTokenInput.Container>
      <Select.Root
        value={value}
        onValueChange={onValueChange}
        open={open}
        onOpenChange={onOpenChange}
        disabled={disableSelect}
      >
        <BridgeTokenInput.SelectTrigger
          open={open}
          selectedToken={
            // Use the symbol / icon of the vertex product instead of what Axelar data gives
            selectedVertexProductToken
              ? {
                  iconUrl: selectedVertexProductToken.icon.url,
                  symbol: selectedVertexProductToken.symbol,
                }
              : undefined
          }
          disabled={disableSelect}
        />
        <BridgeTokenInput.SelectOptions>
          {selectOptions.map((option) => {
            const vertexProductToken =
              option.original.vertexProduct.metadata.token;
            return (
              <BridgeTokenInput.SelectOption
                isSelected={option.value === value}
                key={vertexProductToken.address}
                symbol={vertexProductToken.symbol}
                iconUrl={vertexProductToken.icon.url}
                optionValue={vertexProductToken.address}
              />
            );
          })}
        </BridgeTokenInput.SelectOptions>
      </Select.Root>
      {/*Use type="text" here as we're formatting the number*/}
      <BridgeTokenInput.Input
        readOnly
        value={formatNumber(estimatedReceiveAmount, {
          formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
        })}
        estimatedValueUsd={estimatedReceiveValueUsd}
        type="text"
      />
    </BridgeTokenInput.Container>
  );
}

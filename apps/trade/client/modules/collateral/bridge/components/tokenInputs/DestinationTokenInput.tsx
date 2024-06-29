import { BigDecimal } from '@vertex-protocol/utils';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import {
  CompactInput,
  Select,
  SelectOption,
  useSelect,
} from '@vertex-protocol/web-ui';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/useBridgeForm/types';
import { DestinationBridgeToken } from 'client/modules/collateral/bridge/types';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { BridgeTokenSelect } from './BridgeTokenSelect';

interface Props {
  form: UseFormReturn<BridgeFormValues>;
  selectedDestinationToken: DestinationBridgeToken | undefined;
  allDestinationTokens: DestinationBridgeToken[];
  estimatedReceiveAmount: BigDecimal | undefined;
  estimatedReceiveValueUsd: BigDecimal | undefined;
  disabled?: boolean;
}

export function DestinationTokenInput({
  form,
  selectedDestinationToken,
  allDestinationTokens,
  estimatedReceiveAmount,
  estimatedReceiveValueUsd,
  disabled,
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

  const selectElement = (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      <BridgeTokenSelect.Trigger
        open={open}
        disabled={disabled}
        selectedToken={
          // Use the symbol / icon of the vertex product instead of what Axelar data gives
          selectedVertexProductToken
            ? {
                iconUrl: selectedVertexProductToken.icon.url,
                symbol: selectedVertexProductToken.symbol,
              }
            : undefined
        }
      />
      <BridgeTokenSelect.Options>
        {selectOptions.map((option) => {
          const vertexProductToken =
            option.original.vertexProduct.metadata.token;
          return (
            <BridgeTokenSelect.Option
              isSelected={option.value === value}
              key={vertexProductToken.address}
              symbol={vertexProductToken.symbol}
              iconUrl={vertexProductToken.icon.url}
              optionValue={vertexProductToken.address}
            />
          );
        })}
      </BridgeTokenSelect.Options>
    </Select.Root>
  );

  return (
    <CompactInput
      readOnly
      disabled={disabled}
      value={formatNumber(estimatedReceiveAmount, {
        formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
      })}
      inputContainerClassName="pl-0"
      startElement={selectElement}
      endElement={
        <EstimatedCurrencyValueItem
          estimatedValueUsd={estimatedReceiveValueUsd}
        />
      }
    />
  );
}

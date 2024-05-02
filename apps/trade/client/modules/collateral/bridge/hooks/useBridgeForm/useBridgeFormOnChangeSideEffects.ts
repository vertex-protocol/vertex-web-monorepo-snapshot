import { UseFormReturn } from 'react-hook-form';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/useBridgeForm/types';
import { BigDecimal } from '@vertex-protocol/utils';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import { useEffect } from 'react';
import {
  BridgeToken,
  DestinationBridgeToken,
} from 'client/modules/collateral/bridge/types';

interface Params {
  form: UseFormReturn<BridgeFormValues>;
  validAmount: BigDecimal | undefined;
  validPercentageAmount: number | undefined;
  sourceTokenBalance: BigDecimal | undefined;
  selectedSourceToken: BridgeToken | undefined;
  allDestinationTokens: DestinationBridgeToken[] | undefined;
  sourceChainId: number;
  sourceTokenAddress: string;
}

export function useBridgeFormOnChangeSideEffects({
  form,
  validPercentageAmount,
  validAmount,
  sourceTokenBalance,
  sourceTokenAddress,
  sourceChainId,
  selectedSourceToken,
  allDestinationTokens,
}: Params) {
  const { setValue, resetField } = form;

  useLinkedPercentageAmountInputEffects({
    form,
    validAmount,
    validPercentageAmount,
    maxAmount: sourceTokenBalance,
  });

  // Reset token on chain change
  useEffect(() => {
    setValue('sourceTokenAddress', '');
  }, [setValue, sourceChainId]);

  // Reset source amount and percentage on token change
  useEffect(() => {
    resetField('amount');
    setValue('percentageAmount', 0);
  }, [resetField, setValue, sourceTokenAddress]);

  // Set destination token address on source token change for overlapping token symbols
  useEffect(
    () => {
      if (!selectedSourceToken || !allDestinationTokens) {
        return;
      }
      const destinationToken = allDestinationTokens.find((destinationToken) =>
        selectedSourceToken.symbol
          .toLowerCase()
          .includes(destinationToken.symbol.toLowerCase()),
      );

      if (destinationToken) {
        setValue('destinationTokenAddress', destinationToken.address);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedSourceToken],
  );
}

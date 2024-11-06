import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
  useEVMContext,
  usePrimaryChainId,
} from '@vertex-protocol/react-client';
import { CompactInput } from '@vertex-protocol/web-ui';
import { CHAIN_ICON_BY_CHAIN } from 'client/assets/chains/chainIcons';
import { DestinationTokenSelect } from 'client/modules/collateral/bridge/components/BridgeSelect/DestinationTokenSelect';
import { BridgeFormValues } from 'client/modules/collateral/bridge/hooks/form/types';
import { DestinationBridgeToken } from 'client/modules/collateral/bridge/types';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<BridgeFormValues>;
  selectedDestinationToken: DestinationBridgeToken | undefined;
  allDestinationTokens: DestinationBridgeToken[];
  receiveAmount: BigDecimal | undefined;
  estimatedReceiveValueUsd: BigDecimal | undefined;
  disabled?: boolean;
}

export function BridgeDestinationInput({
  form,
  selectedDestinationToken,
  allDestinationTokens,
  disabled,
  receiveAmount,
  estimatedReceiveValueUsd,
}: Props) {
  const { primaryChain } = useEVMContext();
  const primaryChainId = usePrimaryChainId();

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-text-primary text-base">Receive/Deposit</span>
      <div
        // Using grid here to match the source selection layout
        className="grid grid-cols-2"
      >
        <DestinationTokenSelect
          form={form}
          selectedDestinationToken={selectedDestinationToken}
          allDestinationTokens={allDestinationTokens}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <CompactInput
          readOnly
          value={formatNumber(receiveAmount, {
            formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
          })}
          endElement={
            <EstimatedCurrencyValueItem
              estimatedValueUsd={estimatedReceiveValueUsd}
            />
          }
          disabled={disabled}
        />
        <div className="text-text-primary flex items-center gap-x-1 text-xs">
          <span className="text-text-tertiary">
            In your {clientEnv.brandMetadata.displayName} trading account on
          </span>
          <div className="flex items-center gap-x-0.5">
            <Image
              src={CHAIN_ICON_BY_CHAIN[primaryChainId]}
              alt={primaryChain.name}
              className="size-4 rounded-full"
            />
            {primaryChain.name}
          </div>
        </div>
      </div>
    </div>
  );
}

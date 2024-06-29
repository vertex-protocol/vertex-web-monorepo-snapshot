import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useBridgeEstimatedSubaccountInfoChange } from 'client/modules/collateral/bridge/hooks/useBridgeEstimatedSubaccountInfoChange';
import { BridgeRouteSummary } from 'client/modules/collateral/bridge/hooks/useBridgeRouteSummary';
import {
  BridgeChain,
  BridgeToken,
  DestinationBridgeToken,
} from 'client/modules/collateral/bridge/types';
import Image from 'next/image';

interface Props {
  selectedSourceAmount: BigDecimal | undefined;
  selectedSourceToken: BridgeToken | undefined;
  selectedSourceChain: BridgeChain | undefined;
  selectedDestinationToken: DestinationBridgeToken | undefined;
  bridgeRouteSummary: BridgeRouteSummary | undefined;
}

export function BridgeSummaryDisclosure({
  selectedSourceAmount,
  selectedSourceToken,
  selectedSourceChain,
  selectedDestinationToken,
  bridgeRouteSummary,
}: Props) {
  const subaccountInfoChange = useBridgeEstimatedSubaccountInfoChange({
    selectedDestinationToken,
    estimatedReceiveAmount: bridgeRouteSummary?.receiveAmount,
  });

  const disclosureContent = (
    <div className="flex w-full flex-col gap-y-2 px-3 pb-3">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        labelClassName="gap-x-2"
        label={
          <>
            <span>Bridge from</span>
            {selectedSourceChain && (
              <div className="flex items-center gap-x-1.5">
                {/*Rendering external img*/}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedSourceChain.externalIconUrl}
                  alt={selectedSourceChain.chainName}
                  className="h-4 w-4"
                />
                <span>{selectedSourceChain.chainName}</span>
              </div>
            )}
          </>
        }
        valueContent={
          selectedSourceToken && (
            <>
              <AmountWithSymbol
                formattedSize={formatNumber(selectedSourceAmount, {
                  formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
                })}
                symbol={selectedSourceToken.symbol}
              />
              {/*Rendering external img*/}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedSourceToken.externalIconUrl ?? ''}
                alt={selectedSourceToken.symbol}
                className="size-4"
              />
            </>
          )
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Est. Receive"
        valueClassName="gap-x-1.5"
        valueContent={
          selectedDestinationToken && (
            <>
              <AmountWithSymbol
                formattedSize={formatNumber(bridgeRouteSummary?.receiveAmount, {
                  formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
                })}
                symbol={selectedDestinationToken.symbol}
              />
              <Image
                src={
                  selectedDestinationToken.vertexProduct.metadata.token.icon
                    .asset
                }
                alt={selectedDestinationToken.symbol}
                width={16}
                height={16}
              />
            </>
          )
        }
      />
      <Divider />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Est. Time"
        tooltip={{ id: 'bridgeEstimatedTime' }}
        value={bridgeRouteSummary?.bridgeTime}
        valueContent={
          <>
            {`${formatNumber(bridgeRouteSummary?.bridgeTime, {
              formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
            })}s `}
            <Icons.BsLightningChargeFill size={12} className="text-warning" />
          </>
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Est. Gas"
        tooltip={{ id: 'bridgeEstimatedGas' }}
        value={bridgeRouteSummary?.gas?.amount}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
        valueEndElement={bridgeRouteSummary?.gas?.symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Axelar Fee"
        tooltip={{ id: 'bridgeAxelarFee' }}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        value={bridgeRouteSummary?.feeUsd}
      />
      <Divider />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Account Value"
        value={subaccountInfoChange.current?.accountValueUsd}
        newValue={subaccountInfoChange.estimated?.accountValueUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        changeArrowClassName="text-positive"
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Asset Balance"
        value={subaccountInfoChange.current?.vertexBalance}
        newValue={subaccountInfoChange.estimated?.vertexBalance}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        changeArrowClassName="text-positive"
        valueEndElement={
          selectedDestinationToken?.vertexProduct.metadata.token.symbol
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Margin Usage"
        value={subaccountInfoChange.current?.marginUsageBounded}
        newValue={subaccountInfoChange.estimated?.marginUsageBounded}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        changeArrowClassName="text-positive"
      />
    </div>
  );

  const hasEstimation = !!bridgeRouteSummary;

  return (
    <ActionSummary.Disclosure
      expandableContent={disclosureContent}
      labelContent="Summary"
      triggerOpen={hasEstimation}
      isHighlighted={hasEstimation}
    />
  );
}

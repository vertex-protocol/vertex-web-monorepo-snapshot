import { BigDecimal } from '@vertex-protocol/client';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { LineItem } from 'client/components/LineItem/LineItem';
import { useBridgeEstimatedSubaccountInfoChange } from 'client/modules/collateral/bridge/hooks/useBridgeEstimatedSubaccountInfoChange';
import { BridgeRouteSummary } from 'client/modules/collateral/bridge/hooks/useBridgeRouteSummary';
import {
  BridgeChain,
  BridgeToken,
  DestinationBridgeToken,
} from 'client/modules/collateral/bridge/types';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
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
      <LineItem.Base
        label={
          <div className="flex items-center gap-x-2">
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
          </div>
        }
        value={
          selectedSourceToken && (
            <div className="flex items-center gap-x-1.5">
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
                className="h-4 w-4"
              />
            </div>
          )
        }
      />
      <LineItem.Base
        label="Est. Receive"
        value={
          selectedDestinationToken && (
            <div className="flex items-center gap-x-1.5">
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
            </div>
          )
        }
      />
      <Divider />
      <LineItem.Metric
        label="Est. Time"
        tooltip={{ id: 'bridgeEstimatedTime' }}
        value={bridgeRouteSummary?.bridgeTime}
        renderValue={(val) => {
          if (!val) return '-';
          return (
            <>
              {`${val}s `}
              <Icons.BsLightningChargeFill size={12} className="text-warning" />
            </>
          );
        }}
      />
      <LineItem.Metric
        label="Est. Gas"
        tooltip={{ id: 'bridgeEstimatedGas' }}
        value={bridgeRouteSummary?.gas?.amount}
        renderValue={CustomNumberFormatSpecifier.NUMBER_PRECISE}
        valueEndElement={bridgeRouteSummary?.gas?.symbol}
      />
      <LineItem.Metric
        label="Axelar Fee"
        tooltip={{ id: 'bridgeAxelarFee' }}
        renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
        value={bridgeRouteSummary?.feeUsd}
      />
      <Divider />
      <LineItem.MetricWithEstimation
        label="Account Value"
        currentValue={subaccountInfoChange.current?.accountValueUsd}
        estimatedValue={subaccountInfoChange.estimated?.accountValueUsd}
        renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
        arrowClassName="text-positive"
      />
      <LineItem.MetricWithEstimation
        label="Asset Balance"
        currentValue={subaccountInfoChange.current?.vertexBalance}
        estimatedValue={subaccountInfoChange.estimated?.vertexBalance}
        renderValue={CustomNumberFormatSpecifier.NUMBER_AUTO}
        arrowClassName="text-positive"
        valueEndElement={
          selectedDestinationToken?.vertexProduct.metadata.token.symbol
        }
      />
      <LineItem.MetricWithEstimation
        label="Margin Usage"
        currentValue={subaccountInfoChange.current?.marginUsageBounded}
        estimatedValue={subaccountInfoChange.estimated?.marginUsageBounded}
        renderValue={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        arrowClassName="text-positive"
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

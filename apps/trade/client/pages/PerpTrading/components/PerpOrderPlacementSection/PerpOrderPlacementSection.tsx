import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { AdvancedOrderSettings } from 'client/modules/trading/components/AdvancedOrderSettings/AdvancedOrderSettings';
import { OrderFormInputs } from 'client/modules/trading/components/OrderFormInputs';
import { OrderFormSpreadWarningPanel } from 'client/modules/trading/components/OrderFormSpreadWarningPanel';
import { OrderSideTabs } from 'client/modules/trading/components/OrderSideTabs';
import { OrderSubmitButton } from 'client/modules/trading/components/OrderSubmitButton';
import { PriceTypeTabs } from 'client/modules/trading/components/PriceTypeTabs';
import { StopMarketOrderDismissible } from 'client/modules/trading/components/StopMarketOrderDismissible';
import { StopOrderTriggerPriceInfo } from 'client/modules/trading/components/StopOrderTriggerPriceInfo';
import { TradingErrorPanel } from 'client/modules/trading/components/TradingErrorPanel';
import { useIsHighSpread } from 'client/modules/trading/hooks/useIsHighSpread';
import { PerpLeverageSelector } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpLeverageSelector';
import { PerpOrderSummary } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpOrderSummary';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { usePerpTradingFormTradingAccountMetrics } from 'client/pages/PerpTrading/hooks/usePerpTradingFormTradingAccountMetrics';
import { PerpTpSlSection } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlSection';
import { PerpTradeDegenRewardsDismissible } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTradeDegenRewardsDismissible';

export function PerpOrderPlacementSection({ className }: WithClassnames) {
  const {
    onSubmit,
    validators,
    formError,
    currentMarket,
    inputConversionPrice,
    inputIncrements,
    minAssetOrderSize,
    buttonState,
    validatedAssetAmountInput,
    executionConversionPrice,
    maxAssetOrderSize,
    enableMaxSizeLogic,
    orderSide,
    priceType,
  } = usePerpOrderFormContext();
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  const isHighSpread = useIsHighSpread(currentMarket?.productId);

  const tradingAccountMetrics = usePerpTradingFormTradingAccountMetrics({
    currentMarket,
    orderSide,
    validatedAssetAmountInput,
    executionConversionPrice,
    maxAssetOrderSize,
    enableMaxSizeLogic,
  });

  const isStopOrder = priceType === 'stop';
  const isMarketOrder = priceType === 'market';
  const marketSymbol = currentMarket?.metadata.symbol;

  return (
    <Form
      onSubmit={onSubmit}
      className={joinClassNames('flex flex-col gap-y-2.5 p-3', className)}
    >
      <PerpTradeDegenRewardsDismissible productId={currentMarket?.productId} />
      <PerpLeverageSelector
        productId={currentMarket?.productId}
        className="px-4"
      />
      <OrderSideTabs />
      <PriceTypeTabs />
      <div className="flex flex-1 flex-col gap-y-3">
        <StopMarketOrderDismissible isStopOrder={isStopOrder} />
        <OrderFormInputs
          formError={formError}
          validators={validators}
          baseSymbol={marketSymbol}
          inputIncrements={inputIncrements}
          minAssetOrderSize={minAssetOrderSize}
          quoteSymbol={primaryQuoteSymbol}
        />
        <ValueWithLabel.Horizontal
          label="Margin Req. / Avail."
          sizeVariant="xs"
          valueContent={
            <>
              {formatNumber(tradingAccountMetrics.derivedMetrics.costUsd, {
                formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
              })}
              <span className="text-text-tertiary"> / </span>
              {formatNumber(
                tradingAccountMetrics.derivedMetrics.fundsAvailableUsd,
                {
                  formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
                },
              )}
            </>
          }
        />
        {isMarketOrder && <PerpTpSlSection />}
        {!isStopOrder && (
          <AdvancedOrderSettings
            priceType={priceType}
            formError={formError}
            validators={validators}
          />
        )}
        <TradingErrorPanel formError={formError} />
        {isHighSpread && <OrderFormSpreadWarningPanel />}
        <div className="mt-auto flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-1.5">
            <OrderSubmitButton
              isPerp
              marketSymbol={marketSymbol}
              state={buttonState}
              side={orderSide}
            />
            <StopOrderTriggerPriceInfo
              priceIncrement={currentMarket?.priceIncrement}
              inputConversionPrice={inputConversionPrice}
              isStopOrder={isStopOrder}
              orderSide={orderSide}
            />
          </div>
          {/*Margin for extra space between the divider and order summary*/}
          <Divider className="mb-3" />
          <PerpOrderSummary
            currentState={tradingAccountMetrics.currentState}
            estimatedState={tradingAccountMetrics.estimatedState}
          />
        </div>
      </div>
    </Form>
  );
}

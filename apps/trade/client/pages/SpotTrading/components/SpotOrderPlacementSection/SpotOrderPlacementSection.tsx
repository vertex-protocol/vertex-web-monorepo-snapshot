import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { AdvancedOrderSettings } from 'client/modules/trading/components/AdvancedOrderSettings/AdvancedOrderSettings';
import { OrderFormInputs } from 'client/modules/trading/components/OrderFormInputs';
import { OrderFormSpreadWarningPanel } from 'client/modules/trading/components/OrderFormSpreadWarningPanel';
import { OrderFormVrtxBorrowWarningPanel } from 'client/modules/trading/components/OrderFormVrtxBorrowWarningPanel';
import { OrderSideTabs } from 'client/modules/trading/components/OrderSideTabs';
import { OrderSubmitButton } from 'client/modules/trading/components/OrderSubmitButton';
import { PriceTypeTabs } from 'client/modules/trading/components/PriceTypeTabs';
import { StopMarketOrderDismissible } from 'client/modules/trading/components/StopMarketOrderDismissible';
import { StopOrderTriggerPriceInfo } from 'client/modules/trading/components/StopOrderTriggerPriceInfo';
import { TradingErrorPanel } from 'client/modules/trading/components/TradingErrorPanel';
import { useIsHighSpread } from 'client/modules/trading/hooks/useIsHighSpread';
import { PredictionMarketInfo } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/PredictionMarketInfo';
import { SpotLeverageOffDismissible } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotLeverageOffDismissible';
import { SpotLeverageOnDisclosure } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotLeverageOnDisclosure';
import { SpotMarginSwitch } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotMarginSwitch';
import { SpotOrderSummary } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotOrderSummary';
import { SpotTradingFormAccountInfo } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotTradingFormAccountInfo';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { useShowLeverageWarnings } from 'client/pages/SpotTrading/hooks/useShowLeverageWarnings';
import { useSpotTradingFormAccountInfo } from 'client/pages/SpotTrading/hooks/useSpotTradingFormAccountInfo';
import { useSpotTradingFormAccountMetrics } from 'client/pages/SpotTrading/hooks/useSpotTradingFormAccountMetrics';

export function SpotOrderPlacementSection({ className }: WithClassnames) {
  const { protocolTokenMetadata } = useVertexMetadataContext();

  const {
    form,
    onSubmit,
    currentMarket,
    quoteMetadata,
    validators,
    inputConversionPrice,
    inputIncrements,
    minAssetOrderSize,
    validatedAssetAmountInput,
    executionConversionPrice,
    enableMaxSizeLogic,
    maxAssetOrderSize,
    formError,
    buttonState,
  } = useSpotOrderFormContext();
  const {
    maxOrderSize,
    symbol: accountInfoSymbol,
    showQuote,
    leverageEnabled,
  } = useSpotTradingFormAccountInfo();

  const { showLeverageOnWarning, showLeverageOffWarning } =
    useShowLeverageWarnings();
  const isHighSpread = useIsHighSpread(currentMarket?.productId);

  const priceType = form.watch('priceType');
  const orderSide = form.watch('side');

  const tradingAccountMetrics = useSpotTradingFormAccountMetrics({
    currentMarket,
    quoteMetadata,
    orderSide,
    validatedAssetAmountInput,
    executionConversionPrice,
    enableMaxSizeLogic,
    maxAssetOrderSize,
  });

  const marketSymbol = currentMarket?.metadata.token.symbol;

  const isStopOrder = priceType === 'stop';

  const showVrtxBorrowWarning =
    currentMarket?.productId === protocolTokenMetadata.productId &&
    leverageEnabled &&
    orderSide === 'short';

  return (
    <div className={joinClassNames('flex flex-col gap-y-2.5 py-2', className)}>
      <SpotMarginSwitch className="px-3" />
      {/* This div is used so we can use absolute position in SpotLeverageOnDisclosure to fill the entire container. */}
      <div className="relative flex flex-1">
        <Form
          onSubmit={onSubmit}
          className="flex flex-1 flex-col gap-y-2.5 px-3"
        >
          {showLeverageOnWarning && <SpotLeverageOnDisclosure />}
          {showLeverageOffWarning && (
            <SpotLeverageOffDismissible className="bg-surface-1" />
          )}
          <OrderSideTabs />
          <PriceTypeTabs />
          <div className="flex flex-1 flex-col gap-y-3">
            <StopMarketOrderDismissible isStopOrder={isStopOrder} />
            <OrderFormInputs
              validators={validators}
              quoteSymbol={quoteMetadata?.symbol}
              baseSymbol={marketSymbol}
              inputIncrements={inputIncrements}
              minAssetOrderSize={minAssetOrderSize}
              formError={formError}
            />
            <SpotTradingFormAccountInfo
              maxOrderSize={maxOrderSize}
              symbol={accountInfoSymbol}
              leverageEnabled={leverageEnabled}
              showQuote={showQuote}
              sizeIncrement={currentMarket?.sizeIncrement}
              derivedMetrics={tradingAccountMetrics.derivedMetrics}
            />
            {!isStopOrder && (
              <AdvancedOrderSettings
                priceType={priceType}
                formError={formError}
                validators={validators}
              />
            )}
            <TradingErrorPanel formError={formError} />
            {showVrtxBorrowWarning && <OrderFormVrtxBorrowWarningPanel />}
            {isHighSpread && <OrderFormSpreadWarningPanel />}
            <div className="mt-auto flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-1.5">
                <OrderSubmitButton
                  isPerp={false}
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
                <PredictionMarketInfo />
              </div>
              {/*Margin for extra space between the divider and order summary*/}
              <Divider className="mb-3" />
              <SpotOrderSummary
                currentState={tradingAccountMetrics.currentState}
                estimatedState={tradingAccountMetrics.estimatedState}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

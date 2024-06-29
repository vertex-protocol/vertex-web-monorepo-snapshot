import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AdvancedOrderSettings } from 'client/modules/trading/components/AdvancedOrderSettings/AdvancedOrderSettings';
import { OrderFormInputs } from 'client/modules/trading/components/OrderFormInputs';
import { OrderFormSpreadWarningPanel } from 'client/modules/trading/components/OrderFormSpreadWarningPanel';
import { OrderFormVrtxBorrowWarningPanel } from 'client/modules/trading/components/OrderFormVrtxBorrowWarningPanel';
import { OrderSideTabs } from 'client/modules/trading/components/OrderSideTabs';
import { PriceTypeTabs } from 'client/modules/trading/components/PriceTypeTabs';
import { StopMarketOrderDismissible } from 'client/modules/trading/components/StopMarketOrderDismissible';
import { StopOrderTriggerPriceInfo } from 'client/modules/trading/components/StopOrderTriggerPriceInfo';
import { TradingErrorPanel } from 'client/modules/trading/components/TradingErrorPanel';
import { useIsHighSpread } from 'client/modules/trading/hooks/useIsHighSpread';
import { SpotLeverageOffDismissible } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotLeverageOffDismissible';
import { SpotLeverageSegmentedControl } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotLeverageSegmentedControl';
import { SpotOrderSubmitWithSummary } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotOrderSubmitWithSummary';
import { SpotTradingFormAccountInfo } from 'client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotTradingFormAccountInfo';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { Form } from 'react-hook-form';
import { useShowLeverageWarnings } from '../../hooks/useShowLeverageWarnings';
import { useSpotTradingFormAccountInfo } from '../../hooks/useSpotTradingFormAccountInfo';
import { SpotLeverageOnDisclosure } from './components/SpotLeverageOnDisclosure';

export function SpotOrderPlacementSection({ className }: WithClassnames) {
  const { show } = useDialog();
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
    formError,
  } = useSpotOrderFormContext();
  const {
    maxOrderSize,
    symbol: accountInfoSymbol,
    showQuote,
    leverageEnabled,
  } = useSpotTradingFormAccountInfo();
  const marketSymbol = currentMarket?.metadata.token.symbol;

  const { showLeverageOnWarning, showLeverageOffWarning } =
    useShowLeverageWarnings();
  const isHighSpread = useIsHighSpread(currentMarket?.productId);

  const priceType = form.watch('priceType');
  const orderSide = form.watch('side');

  const isStopOrder = priceType === 'stop';

  const showVrtxBorrowWarning =
    currentMarket?.productId === protocolTokenMetadata.productId &&
    leverageEnabled &&
    orderSide === 'short';

  return (
    <div
      className={joinClassNames('flex flex-col gap-y-2.5 pb-4 pt-2', className)}
    >
      <SpotLeverageSegmentedControl className="px-2" />
      <div className="relative flex-1">
        <Form
          onSubmit={onSubmit}
          className="flex flex-1 flex-col gap-y-2.5 px-2"
        >
          {showLeverageOnWarning && <SpotLeverageOnDisclosure />}
          {showLeverageOffWarning && (
            <SpotLeverageOffDismissible className="bg-surface-1" />
          )}
          <OrderSideTabs />
          <PriceTypeTabs />
          <div className="flex flex-col gap-y-5">
            <StopMarketOrderDismissible isStopOrder={isStopOrder} />
            <OrderFormInputs
              validators={validators}
              quoteSymbol={quoteMetadata?.symbol}
              baseSymbol={marketSymbol}
              inputIncrements={inputIncrements}
              minAssetOrderSize={minAssetOrderSize}
              formError={formError}
            />
            {!isStopOrder && (
              <AdvancedOrderSettings
                priceType={priceType}
                formError={formError}
                validators={validators}
              />
            )}
            <SpotTradingFormAccountInfo
              maxOrderSize={maxOrderSize}
              symbol={accountInfoSymbol}
              leverageEnabled={leverageEnabled}
              showQuote={showQuote}
              sizeIncrement={currentMarket?.sizeIncrement}
            />
            <TradingErrorPanel formError={formError} />
            {showVrtxBorrowWarning && <OrderFormVrtxBorrowWarningPanel />}
            {isHighSpread && <OrderFormSpreadWarningPanel />}
            {/*Extra padding to separate summary section a bit more*/}
            <div className="flex flex-col gap-y-2.5 pt-5">
              <SpotOrderSubmitWithSummary
                onSlippageAdjust={() => {
                  show({
                    type: 'account_center',
                    params: { initialShowSettingsContent: true },
                  });
                }}
              />
              <StopOrderTriggerPriceInfo
                priceIncrement={currentMarket?.priceIncrement}
                inputConversionPrice={inputConversionPrice}
                isStopOrder={isStopOrder}
                orderSide={orderSide}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

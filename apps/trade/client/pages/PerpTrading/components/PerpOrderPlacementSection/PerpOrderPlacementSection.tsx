import { WithClassnames } from '@vertex-protocol/web-common';
import { Form } from 'client/components/Form';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AdvancedOrderSettings } from 'client/modules/trading/components/AdvancedOrderSettings/AdvancedOrderSettings';
import { OrderFormInputs } from 'client/modules/trading/components/OrderFormInputs';
import { OrderFormSpreadWarningPanel } from 'client/modules/trading/components/OrderFormSpreadWarningPanel';
import { OrderFormTpSlWarningPanel } from 'client/modules/trading/components/OrderFormTpSlWarningPanel';
import { OrderSideTabs } from 'client/modules/trading/components/OrderSideTabs';
import { PriceTypeTabs } from 'client/modules/trading/components/PriceTypeTabs';
import { StopMarketOrderDismissible } from 'client/modules/trading/components/StopMarketOrderDismissible';
import { StopOrderTriggerPriceInfo } from 'client/modules/trading/components/StopOrderTriggerPriceInfo';
import { TradingErrorPanel } from 'client/modules/trading/components/TradingErrorPanel';
import { useIsHighSpread } from 'client/modules/trading/hooks/useIsHighSpread';
import { useHasTpSlOrders } from 'client/modules/trading/tpsl/hooks/useHasTpSlOrders';
import { PerpLeverageSelector } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpLeverageSelector';
import { PerpOrderSubmitWithSummary } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpOrderSubmitWithSummary';
import { PerpTradingFormAccountInfo } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTradingFormAccountInfo';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';

export function PerpOrderPlacementSection({ className }: WithClassnames) {
  const { show } = useDialog();

  const {
    form,
    onSubmit,
    validators,
    formError,
    currentMarket,
    inputConversionPrice,
    buttonState,
    inputIncrements,
    minAssetOrderSize,
  } = usePerpOrderFormContext();
  const marketSymbol = currentMarket?.metadata.symbol;
  const isHighSpread = useIsHighSpread(currentMarket?.productId);
  const hasTpSlOrders = useHasTpSlOrders(currentMarket?.productId);
  const showTpSlWarning = hasTpSlOrders && buttonState === 'idle';

  const priceType = form.watch('priceType');
  const orderSide = form.watch('side');

  const isStopOrder = priceType === 'stop';

  return (
    <div className={className}>
      <Form onSubmit={onSubmit} className="flex flex-col gap-y-2.5 p-2 pb-4">
        <PerpLeverageSelector
          productId={currentMarket?.productId}
          className="px-4"
        />
        <OrderSideTabs />
        <PriceTypeTabs />
        <div className="flex flex-col gap-y-5">
          <StopMarketOrderDismissible isStopOrder={isStopOrder} />
          <OrderFormInputs
            formError={formError}
            validators={validators}
            marketSymbol={marketSymbol}
            inputIncrements={inputIncrements}
            minAssetOrderSize={minAssetOrderSize}
          />
          {!isStopOrder && (
            <AdvancedOrderSettings
              priceType={priceType}
              formError={formError}
              validators={validators}
            />
          )}
          <PerpTradingFormAccountInfo />
          <TradingErrorPanel formError={formError} />
          {isHighSpread && <OrderFormSpreadWarningPanel />}
          {showTpSlWarning && <OrderFormTpSlWarningPanel />}
          {/*Extra padding to separate summary section a bit more*/}
          <div className="flex flex-col gap-y-2.5 pt-5">
            <PerpOrderSubmitWithSummary
              onSlippageAdjust={() => {
                show({
                  type: 'control_center',
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
  );
}

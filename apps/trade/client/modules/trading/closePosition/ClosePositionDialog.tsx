import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { OrderFormTpSlWarningPanel } from 'client/modules/trading/components/OrderFormTpSlWarningPanel';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { getMarketSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { RangeSlider } from '../components/RangeSlider';
import { useHasTpSlOrders } from '../tpsl/hooks/useHasTpSlOrders';
import { ClosePositionButton } from './components/ClosePositionButton';
import { ClosePositionMetrics } from './components/ClosePositionMetrics';
import { ClosePositionSummary } from './components/ClosePositionSummary';
import { useClosePositionForm } from './hooks/useClosePositionForm';

export interface ClosePositionDialogParams {
  productId: number;
}

export function ClosePositionDialog({ productId }: ClosePositionDialogParams) {
  const { hide } = useDialog();
  const {
    buttonState,
    perpPositionItem,
    priceIncrement,
    sizeIncrement,
    amountClosedPnl,
    amountRealizedPnl,
    disableSlider,
    fractionToClose,
    setFractionToClose,
    onSubmit,
  } = useClosePositionForm({
    productId,
  });

  const hasTpSlOrders = useHasTpSlOrders(productId);
  const showTpSlWarning = hasTpSlOrders && buttonState === 'idle';

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Market Close</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-4">
        <ClosePositionMetrics
          productName={perpPositionItem?.metadata.name}
          iconSrc={perpPositionItem?.metadata.icon.asset}
          symbol={perpPositionItem?.metadata.symbol}
          averageEntryPrice={perpPositionItem?.price.averageEntryPrice}
          oraclePrice={perpPositionItem?.price.fastOraclePrice}
          notionalValueUsd={perpPositionItem?.notionalValueUsd}
          positionAmount={perpPositionItem?.amount}
          estimatedPnlUsd={perpPositionItem?.estimatedPnlUsd}
          marketSizeFormatSpecifier={getMarketSizeFormatSpecifier(
            sizeIncrement,
          )}
          marketPriceFormatSpecifier={getMarketPriceFormatSpecifier(
            priceIncrement,
          )}
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-text-primary text-sm">Close</p>
          <div className="flex flex-col gap-y-2.5">
            <RangeSlider
              min={0}
              max={1}
              step={0.05}
              value={fractionToClose}
              disabled={disableSlider}
              renderValue={(value) =>
                formatNumber(value, {
                  formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
                })
              }
              onValueChange={setFractionToClose}
            />
            <FractionAmountButtons
              selectedFraction={fractionToClose}
              onFractionSelected={setFractionToClose}
              disabled={disableSlider}
            />
          </div>
        </div>
        <ClosePositionSummary
          amountClosedPnl={amountClosedPnl}
          amountRealizedPnL={amountRealizedPnl}
          productName={perpPositionItem?.metadata.name}
        />
        {showTpSlWarning && <OrderFormTpSlWarningPanel />}
        <ClosePositionButton state={buttonState} onSubmit={onSubmit} />
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

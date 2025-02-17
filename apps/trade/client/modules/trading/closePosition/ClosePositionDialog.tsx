import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ClosePositionButton } from 'client/modules/trading/closePosition/components/ClosePositionButton';
import { ClosePositionMetrics } from 'client/modules/trading/closePosition/components/ClosePositionMetrics';
import { ClosePositionSummary } from 'client/modules/trading/closePosition/components/ClosePositionSummary';
import { useClosePositionForm } from 'client/modules/trading/closePosition/hooks/useClosePositionForm';
import { RangeSlider } from 'client/modules/trading/components/RangeSlider';

export interface ClosePositionDialogParams {
  productId: number;
  isoSubaccountName: string | undefined;
}

export function ClosePositionDialog({
  productId,
  isoSubaccountName,
}: ClosePositionDialogParams) {
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
    isoSubaccountName,
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Market Close</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <ClosePositionMetrics
          isoLeverage={perpPositionItem?.iso?.leverage}
          productName={perpPositionItem?.metadata.marketName}
          iconSrc={perpPositionItem?.metadata.icon.asset}
          symbol={perpPositionItem?.metadata.symbol}
          averageEntryPrice={perpPositionItem?.price.averageEntryPrice}
          oraclePrice={perpPositionItem?.price.fastOraclePrice}
          notionalValueUsd={perpPositionItem?.notionalValueUsd}
          positionAmount={perpPositionItem?.amount}
          estimatedPnlUsd={perpPositionItem?.estimatedPnlUsd}
          estimatedPnlFrac={perpPositionItem?.estimatedPnlFrac}
          marketSizeFormatSpecifier={getMarketSizeFormatSpecifier(
            sizeIncrement,
          )}
          marketPriceFormatSpecifier={getMarketPriceFormatSpecifier(
            priceIncrement,
          )}
        />
        <div className="flex flex-col gap-y-2">
          <p className="text-text-primary text-base">Close</p>
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
          productName={perpPositionItem?.metadata.marketName}
        />
        <ClosePositionButton state={buttonState} onSubmit={onSubmit} />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

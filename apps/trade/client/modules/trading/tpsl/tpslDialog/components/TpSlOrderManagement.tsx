import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { TpSlTriggerCriteriaPriceTypeSelect } from 'client/modules/trading/tpsl/components/TpSlTriggerCriteriaPriceTypeSelect';
import { TpSlCancelOrderButton } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlCancelOrderButton';
import { TpSlOrderInfo } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlOrderInfo/TpSlOrderInfo';
import { TpSlPlaceOrderForm } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlPlaceOrderForm/TpSlPlaceOrderForm';
import { useTpSlDialogOrderForm } from 'client/modules/trading/tpsl/tpslDialog/hooks/useTpSlDialogOrderForm';

interface Props {
  productId: number;
  isoSubaccountName: string | null;
  isTakeProfit: boolean;
}

export function TpSlOrderManagement({
  productId,
  isTakeProfit,
  isoSubaccountName,
}: Props) {
  const {
    form,
    formError,
    onSubmit,
    triggerCriteriaPriceType,
    referencePrice,
    isTriggerPriceAbove,
    validateTriggerPrice,
    validTriggerPrice,
    buttonState,
    estimatedPnlUsd,
    priceFormatSpecifier,
    sizeFormatSpecifier,
    existingTriggerOrder,
    priceIncrement,
    positionSize,
    marketName,
  } = useTpSlDialogOrderForm({ productId, isTakeProfit, isoSubaccountName });

  return (
    <div className="text-text-secondary flex flex-col gap-y-2">
      <div className="text-text-primary flex items-center justify-between">
        <DefinitionTooltip definitionId={isTakeProfit ? 'perpTp' : 'perpSl'}>
          {isTakeProfit ? 'Take Profit' : 'Stop Loss'}
        </DefinitionTooltip>
        {existingTriggerOrder ? (
          <TpSlCancelOrderButton order={existingTriggerOrder} />
        ) : (
          <TpSlTriggerCriteriaPriceTypeSelect form={form} />
        )}
      </div>
      {existingTriggerOrder ? (
        <TpSlOrderInfo
          productId={productId}
          isTakeProfit={isTakeProfit}
          existingTpSlOrder={existingTriggerOrder}
          priceFormatSpecifier={priceFormatSpecifier}
          marketName={marketName}
        />
      ) : (
        <TpSlPlaceOrderForm
          isTakeProfit={isTakeProfit}
          form={form}
          formError={formError}
          onSubmit={onSubmit}
          referencePrice={referencePrice}
          isTriggerPriceAbove={isTriggerPriceAbove}
          triggerCriteriaPriceType={triggerCriteriaPriceType}
          validateTriggerPrice={validateTriggerPrice}
          validTriggerPrice={validTriggerPrice}
          buttonState={buttonState}
          estimatedPnlUsd={estimatedPnlUsd}
          priceFormatSpecifier={priceFormatSpecifier}
          sizeFormatSpecifier={sizeFormatSpecifier}
          priceIncrement={priceIncrement}
          positionSize={positionSize}
          marketName={marketName}
        />
      )}
    </div>
  );
}

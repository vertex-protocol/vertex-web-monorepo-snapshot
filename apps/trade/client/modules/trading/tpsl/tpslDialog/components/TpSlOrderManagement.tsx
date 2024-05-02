import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { useTpSlPlaceOrderForm } from '../hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderForm';
import { TpSlCancelOrderButton } from './TpSlCancelOrderButton';
import { TpSlOrderInfo } from './TpSlOrderInfo/TpSlOrderInfo';
import { TpSlPlaceOrderForm } from './TpSlPlaceOrderForm/TpSlPlaceOrderForm';

interface Props {
  productId: number;
  isTakeProfit: boolean;
}

export function TpSlOrderManagement({ productId, isTakeProfit }: Props) {
  const {
    form,
    formError,
    onSubmit,
    pnlFrac,
    setPnlFrac,
    referencePrice,
    isTriggerPriceAbove,
    triggerCriteriaPriceType,
    setTriggerCriteriaPriceType,
    validateTriggerPrice,
    triggerPrice,
    buttonState,
    estimatedPnlUsd,
    priceFormatSpecifier,
    sizeFormatSpecifier,
    relevantOrder,
    priceIncrement,
    positionSize,
    marketName,
  } = useTpSlPlaceOrderForm({ productId, isTakeProfit });

  return (
    <div className="text-text-secondary flex flex-col gap-y-2">
      <div className="text-text-primary flex items-center justify-between text-sm">
        <DefinitionTooltip definitionId={isTakeProfit ? 'perpTp' : 'perpSl'}>
          {isTakeProfit ? 'Take Profit' : 'Stop Loss'}
        </DefinitionTooltip>
        {relevantOrder && <TpSlCancelOrderButton order={relevantOrder} />}
      </div>
      {relevantOrder ? (
        <TpSlOrderInfo
          productId={productId}
          isTakeProfit={isTakeProfit}
          relevantOrder={relevantOrder}
          priceFormatSpecifier={priceFormatSpecifier}
          sizeFormatSpecifier={sizeFormatSpecifier}
          marketName={marketName}
        />
      ) : (
        <TpSlPlaceOrderForm
          isTakeProfit={isTakeProfit}
          form={form}
          formError={formError}
          onSubmit={onSubmit}
          pnlFrac={pnlFrac}
          setPnlFrac={setPnlFrac}
          referencePrice={referencePrice}
          isTriggerPriceAbove={isTriggerPriceAbove}
          triggerCriteriaPriceType={triggerCriteriaPriceType}
          setTriggerCriteriaPriceType={setTriggerCriteriaPriceType}
          validateTriggerPrice={validateTriggerPrice}
          triggerPrice={triggerPrice}
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

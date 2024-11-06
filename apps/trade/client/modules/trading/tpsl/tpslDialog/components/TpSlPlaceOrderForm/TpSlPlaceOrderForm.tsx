import { Form } from 'client/components/Form';
import { TpSlOrderEstimate } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlOrderEstimate';
import { TpSlPlaceOrderInputs } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlPlaceOrderForm/TpSlPlaceOrderInputs';
import { TpSlPlaceOrderSubmitButton } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlPlaceOrderForm/TpSlPlaceOrderSubmitButton';
import { UseTpSlDialogOrderForm } from 'client/modules/trading/tpsl/tpslDialog/hooks/useTpSlDialogOrderForm';

interface Props
  extends Omit<
    UseTpSlDialogOrderForm,
    'existingTriggerOrder' | 'hasExistingPosition'
  > {
  isTakeProfit: boolean;
}

export function TpSlPlaceOrderForm({
  isTakeProfit,
  form,
  formError,
  onSubmit,
  isTriggerPriceAbove,
  triggerCriteriaPriceType,
  validateTriggerPrice,
  validTriggerPrice,
  buttonState,
  estimatedPnlUsd,
  priceFormatSpecifier,
  priceIncrement,
  referencePrice,
  marketName,
}: Props) {
  return (
    <Form onSubmit={onSubmit} className="flex flex-col gap-y-3">
      <TpSlPlaceOrderInputs
        form={form}
        formError={formError}
        isTakeProfit={isTakeProfit}
        triggerCriteriaPriceType={triggerCriteriaPriceType}
        validateTriggerPrice={validateTriggerPrice}
        priceIncrement={priceIncrement}
        referencePrice={referencePrice}
        priceFormatSpecifier={priceFormatSpecifier}
      />
      {!formError && (
        <TpSlOrderEstimate
          isTriggerPriceAbove={isTriggerPriceAbove}
          triggerCriteriaPriceType={triggerCriteriaPriceType}
          estimatedPnlUsd={estimatedPnlUsd}
          triggerPrice={validTriggerPrice}
          priceFormatSpecifier={priceFormatSpecifier}
          marketName={marketName}
        />
      )}
      <TpSlPlaceOrderSubmitButton
        isTakeProfit={isTakeProfit}
        state={buttonState}
      />
    </Form>
  );
}

import { TpSlPlaceOrderSubmitButton } from './TpSlPlaceOrderSubmitButton';
import { TpSlPlaceOrderInputs } from './TpSlPlaceOrderInputs';
import { UseTpSlPlaceOrderForm } from '../../hooks/useTpSlPlaceOrderForm/types';
import { TpSlOrderEstimate } from '../TpSlOrderEstimate';
import { Form } from 'client/components/Form';

interface Props extends Omit<UseTpSlPlaceOrderForm, 'relevantOrder'> {
  isTakeProfit: boolean;
}

export function TpSlPlaceOrderForm({
  isTakeProfit,
  form,
  formError,
  onSubmit,
  pnlFrac,
  setPnlFrac,
  isTriggerPriceAbove,
  triggerCriteriaPriceType,
  setTriggerCriteriaPriceType,
  validateTriggerPrice,
  triggerPrice,
  buttonState,
  estimatedPnlUsd,
  priceFormatSpecifier,
  sizeFormatSpecifier,
  priceIncrement,
  positionSize,
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
        setTriggerCriteriaPriceType={setTriggerCriteriaPriceType}
        validateTriggerPrice={validateTriggerPrice}
        pnlFrac={pnlFrac}
        setPnlFrac={setPnlFrac}
        priceIncrement={priceIncrement}
        referencePrice={referencePrice}
        priceFormatSpecifier={priceFormatSpecifier}
      />
      {!formError && (
        <TpSlOrderEstimate
          isTriggerPriceAbove={isTriggerPriceAbove}
          triggerCriteriaPriceType={triggerCriteriaPriceType}
          estimatedPnlUsd={estimatedPnlUsd}
          triggerPrice={triggerPrice}
          priceFormatSpecifier={priceFormatSpecifier}
          sizeFormatSpecifier={sizeFormatSpecifier}
          amountCloseSize={positionSize}
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

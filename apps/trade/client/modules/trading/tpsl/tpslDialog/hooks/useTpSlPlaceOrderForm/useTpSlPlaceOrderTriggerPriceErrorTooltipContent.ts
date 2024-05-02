import { BigDecimal } from '@vertex-protocol/client';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { TriggerCriteriaPriceType } from '../../types';
import { TpSlPlaceOrderErrorType } from '../../hooks/useTpSlPlaceOrderForm/types';
import { useMemo } from 'react';

interface Params {
  formError: TpSlPlaceOrderErrorType | undefined;
  isTakeProfit: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  referencePrice: BigDecimal | undefined;
  priceFormatSpecifier: string;
}

export function useTpSlPlaceOrderTriggerPriceErrorTooltipContent({
  formError,
  isTakeProfit,
  referencePrice,
  triggerCriteriaPriceType,
  priceFormatSpecifier,
}: Params) {
  return useMemo(() => {
    const orderTypeLabel = isTakeProfit ? 'Take profit' : 'Stop loss';

    const priceTypeLabel =
      triggerCriteriaPriceType === 'last_price' ? 'last price' : 'oracle price';

    const formattedReferencePrice = formatNumber(referencePrice, {
      formatSpecifier: priceFormatSpecifier,
    });

    switch (formError) {
      case 'trigger_price_must_be_above_price':
        return `${orderTypeLabel} price must be above the ${priceTypeLabel}: ${formattedReferencePrice}`;
      case 'trigger_price_must_be_below_price':
        return `${orderTypeLabel} price must be below the ${priceTypeLabel}: ${formattedReferencePrice}`;
      case 'invalid_input':
        return 'Please enter a valid amount.';
      default:
        return null;
    }
  }, [
    formError,
    isTakeProfit,
    priceFormatSpecifier,
    referencePrice,
    triggerCriteriaPriceType,
  ]);
}

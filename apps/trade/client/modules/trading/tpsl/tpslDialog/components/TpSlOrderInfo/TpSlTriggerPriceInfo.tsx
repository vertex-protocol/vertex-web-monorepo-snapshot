import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { TriggerCriteriaPriceType } from '../../types';

interface Props {
  isTakeProfit: boolean;
  triggerPrice: BigDecimal;
  isTriggerPriceAbove: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  priceFormatSpecifier: string;
}

export function TpSlTriggerPriceInfo({
  isTakeProfit,
  triggerPrice,
  isTriggerPriceAbove,
  triggerCriteriaPriceType,
  priceFormatSpecifier,
}: Props) {
  const comparatorSymbol = isTriggerPriceAbove ? '≥' : '≤';

  const priceTypeLabel =
    triggerCriteriaPriceType === 'last_price' ? 'Last price' : 'Oracle price';

  const formattedTriggerPrice = formatNumber(triggerPrice, {
    formatSpecifier: priceFormatSpecifier,
  });

  return (
    <div
      className={joinClassNames(
        'text-base',
        isTakeProfit ? 'text-positive' : 'text-negative',
      )}
    >
      {priceTypeLabel} {comparatorSymbol} {formattedTriggerPrice}
    </div>
  );
}
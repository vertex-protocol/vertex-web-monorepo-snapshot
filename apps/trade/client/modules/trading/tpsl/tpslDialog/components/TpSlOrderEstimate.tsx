import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { TriggerCriteriaPriceType } from '../types';

interface Props {
  isTriggerPriceAbove: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  triggerPrice: BigDecimal | undefined;
  estimatedPnlUsd: BigDecimal | undefined;
  priceFormatSpecifier: string;
  sizeFormatSpecifier: string;
  amountCloseSize: BigDecimal | undefined;
  marketName: string | undefined;
}

export function TpSlOrderEstimate({
  isTriggerPriceAbove,
  triggerCriteriaPriceType,
  triggerPrice,
  estimatedPnlUsd,
  amountCloseSize,
  marketName,
  priceFormatSpecifier,
  sizeFormatSpecifier,
}: Props) {
  if (!marketName || !triggerPrice || !estimatedPnlUsd) {
    return null;
  }

  const priceTypeLabel =
    triggerCriteriaPriceType === 'last_price' ? 'last price' : 'oracle price';

  const formattedTriggerPrice = formatNumber(triggerPrice, {
    formatSpecifier: priceFormatSpecifier,
  });

  const formattedEstimatedPnlUsd = formatNumber(estimatedPnlUsd?.abs(), {
    formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
  });

  const formattedAmountCloseSize = formatNumber(amountCloseSize, {
    formatSpecifier: sizeFormatSpecifier,
  });

  const isPositivePnL = estimatedPnlUsd.isPositive();

  return (
    <div className="text-xs">
      If the {priceTypeLabel} {isTriggerPriceAbove ? 'climbs' : 'falls'} to{' '}
      {formattedTriggerPrice}, a{' '}
      <span className="text-text-primary">
        {formattedAmountCloseSize}
        &nbsp;{marketName}&nbsp;
      </span>
      market order will trigger with an estimated{' '}
      {isPositivePnL ? 'profit' : 'loss'} of{' '}
      <span className={isPositivePnL ? 'text-positive' : 'text-negative'}>
        {formattedEstimatedPnlUsd}.
      </span>
    </div>
  );
}

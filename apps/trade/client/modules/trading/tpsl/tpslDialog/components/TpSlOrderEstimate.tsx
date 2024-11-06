import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';

interface Props {
  isTriggerPriceAbove: boolean;
  triggerCriteriaPriceType: TriggerCriteriaPriceType;
  triggerPrice: BigDecimal | undefined;
  estimatedPnlUsd: BigDecimal | undefined;
  priceFormatSpecifier: string;
  marketName: string | undefined;
}

export function TpSlOrderEstimate({
  isTriggerPriceAbove,
  triggerCriteriaPriceType,
  triggerPrice,
  estimatedPnlUsd,
  marketName,
  priceFormatSpecifier,
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

  const isPositivePnL = estimatedPnlUsd.isPositive();

  return (
    <div className="text-xs">
      If the {priceTypeLabel} {isTriggerPriceAbove ? 'climbs' : 'falls'} to{' '}
      {formattedTriggerPrice}, a market order will trigger with an estimated{' '}
      {isPositivePnL ? 'profit' : 'loss'} of{' '}
      <span className={isPositivePnL ? 'text-positive' : 'text-negative'}>
        {formattedEstimatedPnlUsd}.
      </span>
    </div>
  );
}

import { BalanceSide, BigDecimal } from '@vertex-protocol/client';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';

interface Props {
  priceIncrement: BigDecimal | undefined;
  inputConversionPrice: BigDecimal | undefined;
  isStopOrder: boolean;
  orderSide: BalanceSide;
}

export function StopOrderTriggerPriceInfo({
  priceIncrement,
  inputConversionPrice,
  isStopOrder,
  orderSide,
}: Props) {
  if (!inputConversionPrice || !isStopOrder) {
    return null;
  }

  return (
    <div className="text-text-tertiary text-xs">
      Your stop will trigger a market {orderSide === 'long' ? 'buy' : 'sell'}{' '}
      order when the oracle price reaches{' '}
      <span className="text-text-primary">
        {formatNumber(inputConversionPrice, {
          formatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
        })}
      </span>
    </div>
  );
}

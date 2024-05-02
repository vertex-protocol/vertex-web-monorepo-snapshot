import { TriggerOrderInfo } from '@vertex-protocol/client';
import { TpSlOrderEstimate } from '../TpSlOrderEstimate';
import { TpSlTriggerPriceInfo } from './TpSlTriggerPriceInfo';
import { useTpSlOrderInfo } from '../../hooks/useTpSlOrderInfo';

interface Props {
  productId: number;
  relevantOrder: TriggerOrderInfo;
  priceFormatSpecifier: string;
  sizeFormatSpecifier: string;
  isTakeProfit: boolean;
  marketName: string | undefined;
}

export function TpSlOrderInfo({
  productId,
  isTakeProfit,
  relevantOrder,
  priceFormatSpecifier,
  sizeFormatSpecifier,
  marketName,
}: Props) {
  const orderInfo = useTpSlOrderInfo({
    productId,
    relevantOrder,
  });

  return (
    <div className="flex flex-col gap-y-2">
      <TpSlTriggerPriceInfo
        isTakeProfit={isTakeProfit}
        isTriggerPriceAbove={orderInfo.isTriggerPriceAbove}
        triggerCriteriaPriceType={orderInfo.triggerCriteriaPriceType}
        triggerPrice={orderInfo.triggerPrice}
        priceFormatSpecifier={priceFormatSpecifier}
      />
      <TpSlOrderEstimate
        isTriggerPriceAbove={orderInfo.isTriggerPriceAbove}
        triggerCriteriaPriceType={orderInfo.triggerCriteriaPriceType}
        estimatedPnlUsd={orderInfo.estimatedPnlUsd}
        triggerPrice={orderInfo.triggerPrice}
        amountCloseSize={orderInfo.amountCloseSize}
        priceFormatSpecifier={priceFormatSpecifier}
        sizeFormatSpecifier={sizeFormatSpecifier}
        marketName={marketName}
      />
    </div>
  );
}

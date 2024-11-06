import { TriggerOrderInfo } from '@vertex-protocol/client';
import { TpSlOrderEstimate } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlOrderEstimate';
import { TpSlTriggerPriceInfo } from 'client/modules/trading/tpsl/tpslDialog/components/TpSlOrderInfo/TpSlTriggerPriceInfo';
import { useTpSlOrderInfo } from 'client/modules/trading/tpsl/tpslDialog/hooks/useTpSlOrderInfo';

interface Props {
  productId: number;
  existingTpSlOrder: TriggerOrderInfo;
  priceFormatSpecifier: string;
  isTakeProfit: boolean;
  marketName: string | undefined;
}

export function TpSlOrderInfo({
  productId,
  isTakeProfit,
  existingTpSlOrder,
  priceFormatSpecifier,
  marketName,
}: Props) {
  const orderInfo = useTpSlOrderInfo({
    productId,
    existingTpSlOrder,
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
        priceFormatSpecifier={priceFormatSpecifier}
        marketName={marketName}
      />
    </div>
  );
}

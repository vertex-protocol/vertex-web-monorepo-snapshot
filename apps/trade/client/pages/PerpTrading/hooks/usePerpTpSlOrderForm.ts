import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { useMemo, useState } from 'react';
import { BalanceSide, BigDecimal } from '@vertex-protocol/client';
import { TradeEntryEstimate } from 'client/modules/trading/hooks/useEstimateTradeEntry';
import { UseTpSlPlaceOrderForm } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { useTpSlPlaceOrderForm } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderForm';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { PlaceOrderPriceType } from 'client/modules/trading/types';

interface UsePerpTpSlOrderForm {
  isTpSlCheckboxChecked: boolean;
  setIsTpSlCheckboxChecked: (isChecked: boolean) => void;
  isTpSlCheckboxDisabled: boolean;
  isTpSlEnabled: boolean;
  takeProfitOrderForm: UseTpSlPlaceOrderForm;
  stopLossOrderForm: UseTpSlPlaceOrderForm;
  hasExistingTriggerOrder: boolean;
  hasExistingPosition: boolean;
  hasTpSlOrderFormError: boolean;
}

interface Params {
  productId: number | undefined;
  longWeightInitial: BigDecimal | undefined;
  estimatedTradeEntry: TradeEntryEstimate | undefined;
  priceIncrement: BigDecimal | undefined;
  validatedAssetAmountInput: BigDecimal | undefined;
  orderSide: BalanceSide;
  priceType: PlaceOrderPriceType;
}

export function usePerpTpSlOrderForm({
  productId,
  longWeightInitial,
  estimatedTradeEntry,
  priceIncrement,
  validatedAssetAmountInput,
  orderSide,
  priceType,
}: Params): UsePerpTpSlOrderForm {
  const [isTpSlCheckboxChecked, setIsTpSlCheckboxChecked] = useState(false);
  const isTpSlEnabled = isTpSlCheckboxChecked && priceType === 'market';

  const isSingleSignatureSession = useIsSingleSignatureSession({
    requireActive: true,
  });
  const isTpSlCheckboxDisabled = !isSingleSignatureSession;

  const { data: latestOraclePrices } = useLatestOraclePrices();
  const oraclePrice = productId
    ? latestOraclePrices?.[productId].oraclePrice
    : undefined;

  const { data: latestOrderFill } = useLatestOrderFill({ productId });
  const lastPrice = latestOrderFill?.price;

  const positionChanges = useMemo(() => {
    if (!validatedAssetAmountInput || !estimatedTradeEntry) {
      return;
    }

    const isLong = orderSide === 'long';
    const assetAmountDelta = validatedAssetAmountInput.multipliedBy(
      isLong ? 1 : -1,
    );
    const netEntryAmountDelta = estimatedTradeEntry.estimatedTotal.multipliedBy(
      isLong ? 1 : -1,
    );

    return { assetAmountDelta, netEntryAmountDelta };
  }, [estimatedTradeEntry, orderSide, validatedAssetAmountInput]);

  const takeProfitOrderForm = useTpSlPlaceOrderForm({
    productId,
    isTakeProfit: true,
    oraclePrice,
    lastPrice,
    priceIncrement,
    longWeightInitial,
    positionChanges,
  });

  const stopLossOrderForm = useTpSlPlaceOrderForm({
    productId,
    isTakeProfit: false,
    oraclePrice,
    lastPrice,
    priceIncrement,
    longWeightInitial,
    positionChanges,
  });

  const hasExistingTriggerOrder = !!(
    takeProfitOrderForm.existingTriggerOrder ||
    stopLossOrderForm.existingTriggerOrder
  );
  const hasTpSlOrderFormError = !!(
    takeProfitOrderForm.formError || stopLossOrderForm.formError
  );
  // This will be the same for both `useTpSlPlaceOrderForm` calls,
  // so we only need to check one.
  const hasExistingPosition = takeProfitOrderForm.hasExistingPosition;

  return {
    isTpSlCheckboxChecked,
    setIsTpSlCheckboxChecked,
    isTpSlCheckboxDisabled,
    isTpSlEnabled,
    takeProfitOrderForm,
    stopLossOrderForm,
    hasExistingTriggerOrder,
    hasTpSlOrderFormError,
    hasExistingPosition,
  };
}

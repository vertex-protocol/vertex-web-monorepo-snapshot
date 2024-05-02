import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useMemo } from 'react';
import { useSpotOrderFormContext } from '../context/SpotOrderFormContext';
import { useSpotLeverageEnabled } from 'client/modules/trading/hooks/useSpotLeverageEnabled';

interface UseSpotTradingFormAccountInfo {
  showQuote: boolean | undefined;
  // Max order size and symbol are for either the market asset or quote asset, depending on isQuote
  maxOrderSize: BigDecimal | undefined;
  symbol: string | undefined;
  leverageEnabled: boolean;
}

export function useSpotTradingFormAccountInfo(): UseSpotTradingFormAccountInfo {
  const { spotLeverageEnabled } = useSpotLeverageEnabled();
  const { maxOrderSizes, currentMarket, form } = useSpotOrderFormContext();
  const side = form.watch('side');
  const { balances } = useSpotBalances();

  return useMemo((): UseSpotTradingFormAccountInfo => {
    const quoteBalance = balances?.find((balance) => {
      return balance.productId === QUOTE_PRODUCT_ID;
    });
    const marketBalance = balances?.find((balance) => {
      return balance.productId === currentMarket?.productId;
    });

    if (!quoteBalance || !marketBalance) {
      return {
        leverageEnabled: spotLeverageEnabled,
        showQuote: undefined,
        symbol: undefined,
        maxOrderSize: undefined,
      };
    }

    const showQuote = side === 'long';
    const balanceMetadata = showQuote
      ? quoteBalance.metadata
      : marketBalance.metadata;

    return {
      showQuote,
      maxOrderSize: showQuote ? maxOrderSizes?.quote : maxOrderSizes?.asset,
      symbol: balanceMetadata.token.symbol,
      leverageEnabled: spotLeverageEnabled,
    };
  }, [
    balances,
    spotLeverageEnabled,
    currentMarket?.productId,
    maxOrderSizes?.asset,
    maxOrderSizes?.quote,
    side,
  ]);
}

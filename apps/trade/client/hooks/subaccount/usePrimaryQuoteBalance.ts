import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useMemo } from 'react';

export function usePrimaryQuoteBalance() {
  const { balances, ...rest } = useSpotBalances();

  const data = useMemo(() => {
    return balances?.find((balance) => {
      return balance.productId === QUOTE_PRODUCT_ID;
    });
  }, [balances]);

  return {
    data,
    ...rest,
  };
}

import { BigDecimal } from '@vertex-protocol/utils';
import { useEffect, useRef, useState } from 'react';

export function useLatestPriceChange(latestPrice?: BigDecimal) {
  const latestPriceRef = useRef<BigDecimal>();

  const [latestPriceChange, setLatestPriceChange] = useState<BigDecimal>();

  useEffect(() => {
    // If cached price doesn't exist, store the latest price so we can compare it to the new price.
    if (!latestPriceRef.current) {
      latestPriceRef.current = latestPrice;
      return;
    }
    // Return early if the latest average price is the same as the previous average price to maintain an up/down arrow.
    if (latestPrice?.eq(latestPriceRef.current)) {
      return;
    }
    setLatestPriceChange(latestPrice?.minus(latestPriceRef.current));
    latestPriceRef.current = latestPrice;
  }, [latestPrice]);

  return latestPriceChange;
}

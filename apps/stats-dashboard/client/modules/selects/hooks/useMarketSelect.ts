// TODO: set up Vertex SDK so we can get all perp products (useAllMarkets)
import { useSelect } from 'client/hooks/ui/select/useSelect';
import { useState } from 'react';
import { useMemo } from 'react';

// TODO: add ALL-PERP option
// Stubing MARKET_DROPDOWN_OPTIONS
export const MARKET_DROPDOWN_OPTIONS = [
  {
    productId: 2,
    name: 'BTC-PERP',
  },
  {
    productId: 4,
    name: 'ETH-PERP',
  },
  {
    productId: 6,
    name: 'ARB-PERP',
  },
  {
    productId: 8,
    name: 'BNB-PERP',
  },
] as const;

export function useMarketSelect() {
  const [market, setMarket] = useState({
    productId: 2,
    name: 'BTC-PERP',
  });

  const options = useMemo(() => {
    return MARKET_DROPDOWN_OPTIONS.map((market) => ({
      id: market.productId.toString(),
      label: market.name,
      value: market,
    }));
  }, []);

  const { selectOptions, open, onValueChange, value, onOpenChange } = useSelect(
    {
      defaultOpen: false,
      selectedValue: market,
      onSelectedValueChange: (option) => setMarket(option),
      options,
    },
  );

  return {
    market,
    selectOptions,
    open,
    value,
    onOpenChange,
    onValueChange,
  };
}

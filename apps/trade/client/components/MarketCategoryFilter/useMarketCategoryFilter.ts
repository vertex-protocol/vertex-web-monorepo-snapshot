import { MarketCategory } from '@vertex-protocol/react-client';
import { useCallback } from 'react';

type MarketCategoryID = MarketCategory | 'all';

type MarketCategoryFilterByID = Record<
  MarketCategoryID,
  { value: MarketCategory | undefined; label: string }
>;

const marketCategoryFilterById: MarketCategoryFilterByID = {
  all: {
    value: undefined,
    label: 'All',
  },
  perp: {
    value: 'perp',
    label: 'Perps',
  },
  spot: {
    value: 'spot',
    label: 'Spot',
  },
  meme: {
    value: 'meme',
    label: 'Memes',
  },
  defi: {
    value: 'defi',
    label: 'DeFi',
  },
  chain: {
    value: 'chain',
    label: 'Chains',
  },
  index: {
    value: 'index',
    label: 'Indices',
  },
};

export interface UseMarketCategoryFilterParams {
  marketCategory: MarketCategory | undefined;
  setMarketCategory: (newCategory?: MarketCategory) => void;
}

export function useMarketCategoryFilter({
  marketCategory,
  setMarketCategory,
}: UseMarketCategoryFilterParams) {
  // Handle transformation from value to id
  const selectedMarketCategoryId: MarketCategoryID = marketCategory ?? 'all';

  const setSelectedMarketCategoryId = useCallback(
    (marketCategoryId: string) => {
      // Handle transformation from id to value
      const newMarketCategory =
        marketCategoryFilterById[marketCategoryId as MarketCategoryID];

      setMarketCategory(newMarketCategory?.value);
    },
    [setMarketCategory],
  );

  return {
    selectedMarketCategoryId,
    setSelectedMarketCategoryId,
    marketCategoryFilterById,
  };
}

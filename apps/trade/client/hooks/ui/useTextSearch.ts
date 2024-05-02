import { useDebounce } from 'ahooks';
import { useMemo } from 'react';

interface Params<TItem> {
  // The query to search for
  query: string;
  // Items to search through
  items: TItem[];
  // Given the item, return a string to match against the query. Case insensitive.
  // The function should be a stable reference, either a top level function or a useCallback.
  getSearchString: (item: TItem) => string;
}

interface UseTextSearch<TItem> {
  results: TItem[];
}

/**
 * A simple implementation of text search. Given a query and a list of items, returns a list of items that match the query.
 * Adds debouncing internally for performance optimization.
 * This is NOT optimized for large lists of items.
 *
 * @param params
 */
export function useTextSearch<TItem>({
  query,
  items,
  getSearchString,
}: Params<TItem>): UseTextSearch<TItem> {
  const itemsToSearch = useMemo(() => {
    return items.map((item) => {
      return {
        item,
        searchString: getSearchString(item).toLowerCase(),
      };
    });
  }, [getSearchString, items]);

  const debouncedQuery = useDebounce(query, { wait: 200 });

  const results = useMemo(() => {
    const normalizedQuery = debouncedQuery.toLowerCase().trim();

    const filteredResults = (() => {
      if (!normalizedQuery) {
        return itemsToSearch;
      }

      return itemsToSearch.filter(({ searchString }) =>
        searchString.includes(normalizedQuery),
      );
    })();

    return filteredResults.map(({ item }) => item);
  }, [debouncedQuery, itemsToSearch]);

  return {
    results,
  };
}

import { useCreation, useDebounce } from 'ahooks';
import { useMemo } from 'react';

interface Params<TItem> {
  /**
   * The query to search for.
   */
  query: string;
  /**
   * The items to search. It should be a stable reference, memoized if necessary.
   */
  items: TItem[] | undefined;
  /**
   * Given the item, return a string to match against the query. Case insensitive.
   * The function should be a stable reference, either a top level function or a useCallback.
   */
  getSearchString: (item: TItem) => string;
}

interface UseTextSearch<TItem> {
  results: TItem[];
  normalizedQuery: string;
}

/**
 * Given a query and a list of items, returns a list of items that match the query.
 * Adds debouncing internally for performance optimization.
 * Should be able to handle relatively large lists. Tested with ~50k items.
 */
export function useTextSearch<TItem>({
  query,
  items,
  getSearchString,
}: Params<TItem>): UseTextSearch<TItem> {
  const emptyItems = useCreation<TItem[]>(() => [], []);

  const itemsToSearch = useMemo(() => {
    return (items ?? emptyItems).map((item) => {
      return {
        item,
        searchString: getSearchString(item).toLowerCase(),
      };
    });
  }, [getSearchString, items, emptyItems]);

  const debouncedQuery = useDebounce(query, { wait: 200 });

  const { results, normalizedQuery } = useMemo(() => {
    const normalizedQuery = debouncedQuery.toLowerCase().trim();

    if (!normalizedQuery) {
      return { results: items ?? emptyItems, normalizedQuery };
    }

    const results: TItem[] = [];

    itemsToSearch.forEach(({ item, searchString }) => {
      if (searchString.includes(normalizedQuery)) {
        results.push(item);
      }
    });

    return { results, normalizedQuery };
  }, [debouncedQuery, items, emptyItems, itemsToSearch]);

  return {
    results,
    normalizedQuery,
  };
}

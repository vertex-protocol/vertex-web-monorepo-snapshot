import { InfiniteData } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/table-core';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface Params<TResponseData, TItem> {
  pageSize: number;
  extractItems: (data: TResponseData) => TItem[];

  // From React Query
  numPagesFromQuery?: number;
  hasNextPage?: boolean;

  fetchNextPage(): void;
}

interface UseDataTablePagination<TResponseData, TItem> {
  paginationState: PaginationState;
  setPaginationState: Dispatch<SetStateAction<PaginationState>>;
  pageCount: number;

  // For infinite queries
  getPageData(infiniteData?: InfiniteData<TResponseData | undefined>): TItem[];
}

export function useDataTablePagination<TResponseData, TItem>({
  numPagesFromQuery = 1,
  pageSize,
  fetchNextPage,
  hasNextPage,
  extractItems,
}: Params<TResponseData, TItem>): UseDataTablePagination<TResponseData, TItem> {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  useEffect(() => {
    if (paginationState.pageIndex >= numPagesFromQuery) {
      // If there's a next page, fetch it
      if (hasNextPage) {
        fetchNextPage();
      } else {
        // If data updates (ex. from a chain or account switch) such that the number of pages decreases, and no next page is available, set to the last page from the query
        setPaginationState((prev) => {
          return {
            ...prev,
            pageIndex: numPagesFromQuery - 1,
          };
        });
      }
    }
  }, [
    fetchNextPage,
    hasNextPage,
    numPagesFromQuery,
    paginationState.pageIndex,
  ]);

  const getPageData = useCallback(
    (infiniteData?: InfiniteData<TResponseData>): TItem[] => {
      if (
        infiniteData?.pages == null ||
        !infiniteData.pages.length ||
        paginationState.pageIndex >= infiniteData.pages.length
      ) {
        return [];
      }

      return extractItems(infiniteData.pages[paginationState.pageIndex]);
    },
    [extractItems, paginationState.pageIndex],
  );

  // -1 if unknown, otherwise if there isn't a next page from the query, then the page count is the current # of pages
  const pageCount = hasNextPage ? -1 : numPagesFromQuery;

  return {
    paginationState,
    setPaginationState,
    pageCount,
    getPageData,
  };
}

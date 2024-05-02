import { PaginationState } from '@tanstack/table-core';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { InfiniteData } from '@tanstack/react-query';

interface Params<TResponseData, TItem> {
  pageSize: number;
  extractItems: (data: TResponseData) => TItem[];

  // From React Query
  queryPageCount?: number;
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
  queryPageCount = 1,
  pageSize,
  fetchNextPage,
  hasNextPage,
  extractItems,
}: Params<TResponseData, TItem>): UseDataTablePagination<TResponseData, TItem> {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  // Fetch the next page when needed
  useEffect(
    () => {
      if (paginationState.pageIndex >= queryPageCount) {
        fetchNextPage();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationState.pageIndex],
  );

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
  const pageCount = hasNextPage ? -1 : queryPageCount;

  return {
    paginationState,
    setPaginationState,
    pageCount,
    getPageData,
  };
}

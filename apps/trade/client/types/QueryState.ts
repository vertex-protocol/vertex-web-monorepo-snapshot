// Common interface to unify types for queries
export interface QueryState<TData> {
  data?: TData;
  isError?: boolean;
  isLoading: boolean;
}

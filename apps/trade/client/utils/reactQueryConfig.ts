export const REACT_QUERY_CONFIG = {
  // GC Time for queries that just compute data and don't fetch through a REST call
  // These have dependency arrays based on the lastUpdateTime of dependent queries, so the query keys change quite often
  computeQueryGcTime: 1000,
};

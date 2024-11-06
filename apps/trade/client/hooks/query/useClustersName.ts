import { useQuery } from '@tanstack/react-query';

/**
 * Retrieve Clusters.xyz name for an address
 *
 * @param {string | undefined} address
 * @returns {string | null | undefined} Clusters name for address or null if not found
 *
 * @see https://api.clusters.xyz/v0.1/name/:address
 */
export function useClustersName(address: string | undefined) {
  return useQuery<string | null>({
    enabled: address !== undefined,
    queryKey: ['clustersName', address],
    queryFn: async () => {
      const resp = await fetch(`https://api.clusters.xyz/v0.1/name/${address}`);
      // Clusters documents it should returns HTTP 404 with 'null' as body if
      // address has no name, however currently it returns HTTP 200 with 'null' body.
      //
      // Do not return name for any non-200 HTTP status. Name isn't critical
      // in the app and we don't want to return an error string as name.
      return resp.ok ? await resp.json() : null;
    },
  });
}

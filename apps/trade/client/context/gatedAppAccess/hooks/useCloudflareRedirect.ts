import { useQuery } from '@tanstack/react-query';
import {
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useRunOnceOnCondition } from 'client/hooks/util/useRunOnceOnCondition';

const ALLOWED_DOMAINS = new Set([
  'testnet.vertexprotocol.com',
  'app.vertexprotocol.com',
  'testnet.blitz.exchange',
  'app.blitz.exchange',
]);

/**
 * Checks if CF requires authorization via a JS challenge. If so, redirects to the relevant `/challenge` page
 * which should redirect the user back to the app.
 */
export function useCloudflareRedirect() {
  const vertexClient = usePrimaryChainVertexClient();

  // the /cf-check endpoint only allows CORS for production endpoints
  const isCorsAllowedHost = (() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return ALLOWED_DOMAINS.has(window.location.hostname);
  })();

  const disabled = !vertexClient || !isCorsAllowedHost;

  const { data: requiresCloudflareAuth } = useQuery({
    queryKey: ['requiresCloudflareAuth'],
    queryFn: async () => {
      // !vertexClient check is to make TS happy
      if (disabled || !vertexClient) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.engineClient.getRequiresCloudflareAuth();
    },
    enabled: !disabled,
  });

  // We don't want to keep trying to replace the page, so enforce that we run this only once
  useRunOnceOnCondition(
    Boolean(requiresCloudflareAuth) && typeof window !== 'undefined',
    () => {
      // The checks here should be guaranteed based on the above condition & existence of `requiresAuth`
      if (vertexClient && typeof window !== 'undefined') {
        window.location.replace(
          `${vertexClient.context.engineClient.opts.url}/challenge`,
        );
      }
    },
  );
}

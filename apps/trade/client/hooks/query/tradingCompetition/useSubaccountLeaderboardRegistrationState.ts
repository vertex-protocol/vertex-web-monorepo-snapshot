import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useVertexClientForChainEnv,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { zeroAddress } from 'viem';

export function subaccountLeaderboardRegistrationStateKey(
  chainEnv?: ChainEnv,
  contestId?: number,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountLeaderboardRegistrationState',
    chainEnv,
    contestId,
    subaccountOwner,
    subaccountName,
  );
}

interface Params {
  chainEnv: ChainEnv;
  contestId: number | undefined;
}

export function useSubaccountLeaderboardRegistrationState({
  chainEnv,
  contestId,
}: Params) {
  const vertexClient = useVertexClientForChainEnv(chainEnv);

  const { currentSubaccount } = useSubaccountContext();
  const subaccountOwnerForQuery = currentSubaccount.address ?? zeroAddress;

  const disabled = !vertexClient || !contestId;

  return useQuery({
    queryKey: subaccountLeaderboardRegistrationStateKey(
      chainEnv,
      contestId,
      subaccountOwnerForQuery,
      currentSubaccount.name,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getLeaderboardRegistration({
        contestId,
        subaccountOwner: subaccountOwnerForQuery,
        subaccountName: currentSubaccount.name,
      });
    },
    enabled: !disabled,
    // Query refetch should handle updates
  });
}

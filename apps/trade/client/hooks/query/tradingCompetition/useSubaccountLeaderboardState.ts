import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useVertexClientForChainEnv,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { ZeroAddress } from 'ethers';

export function subaccountLeaderboardStateKey(
  chainEnv?: ChainEnv,
  contestId?: number[],
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountLeaderboardState',
    chainEnv,
    contestId,
    subaccountOwner,
    subaccountName,
  );
}

interface Params {
  chainEnv: ChainEnv;
  contestIds: number[] | undefined;
}

export function useSubaccountLeaderboardState({
  chainEnv,
  contestIds,
}: Params) {
  const vertexClient = useVertexClientForChainEnv(chainEnv);

  const { currentSubaccount } = useSubaccountContext();
  const subaccountOwnerForQuery = currentSubaccount.address ?? ZeroAddress;

  const disabled = !vertexClient || !contestIds;

  return useQuery({
    queryKey: subaccountLeaderboardStateKey(
      chainEnv,
      contestIds,
      subaccountOwnerForQuery,
      currentSubaccount.name,
    ),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const subaccount = {
        subaccountOwner: subaccountOwnerForQuery,
        subaccountName: currentSubaccount.name,
      };

      return vertexClient.context.indexerClient.getLeaderboardParticipant({
        contestIds,
        subaccount,
      });
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}

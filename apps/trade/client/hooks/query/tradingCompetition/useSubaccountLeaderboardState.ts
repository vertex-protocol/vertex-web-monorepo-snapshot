import { useQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  usePrimaryChainVertexClient,
  QueryDisabledError,
  usePrimaryChainId,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { ZeroAddress } from 'ethers';

export function subaccountLeaderboardStateKey(
  primaryChainId?: number,
  contestId?: number,
  subaccountOwner?: string,
  subaccountName?: string,
) {
  return createQueryKey(
    'subaccountLeaderboardState',
    primaryChainId,
    contestId,
    subaccountOwner,
    subaccountName,
  );
}

interface Params {
  contestId: number | undefined;
}

export function useSubaccountLeaderboardState({ contestId }: Params) {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();

  const { currentSubaccount } = useSubaccountContext();
  const subaccountOwnerForQuery = currentSubaccount.address ?? ZeroAddress;

  const disabled = !vertexClient || !contestId;

  return useQuery({
    queryKey: subaccountLeaderboardStateKey(
      primaryChainId,
      contestId,
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
        contestId,
        subaccount,
      });
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}

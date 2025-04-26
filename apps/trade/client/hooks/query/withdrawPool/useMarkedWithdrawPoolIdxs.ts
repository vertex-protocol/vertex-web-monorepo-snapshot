import { useQuery } from '@tanstack/react-query';
import { ChainEnv, toBigInt } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function markedWithdrawPoolIdxsQueryKey(
  chainEnv?: ChainEnv,
  submissionIndices?: string[],
) {
  return createQueryKey('markedWithdrawPoolIdxs', chainEnv, submissionIndices);
}

/**
 * A hook to check if the given submission indices are marked as completed in the withdraw pool.
 * @param submissionIndices
 * @returns
 */
export function useMarkedWithdrawPoolIdxs({
  submissionIndices,
}: {
  submissionIndices: string[] | undefined;
}) {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || !submissionIndices;

  return useQuery({
    queryKey: markedWithdrawPoolIdxsQueryKey(
      primaryChainEnv,
      submissionIndices,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const baseResponse =
        await vertexClient.context.contracts.withdrawPool.read.checkMarkedIdxs([
          submissionIndices.map(toBigInt),
        ]);

      const checkMarkedBySubmissionIndex: Record<string, boolean> = {};

      submissionIndices.forEach((submissionIndex, index) => {
        checkMarkedBySubmissionIndex[submissionIndex] = baseResponse[index];
      });

      return checkMarkedBySubmissionIndex;
    },
    enabled: !disabled,
    refetchInterval: 5000,
  });
}

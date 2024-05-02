import { useMutation } from '@tanstack/react-query';
import { IERC20__factory } from '@vertex-protocol/client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';
import { BigNumberish } from 'ethers';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [tokenAllowanceQueryKey()];

interface Params {
  amount: BigNumberish;
}

/**
 * Approve allowance to spend USDC for the LBA contract
 */
export function useExecuteApproveStakingVrtxAllowance() {
  const { protocolToken } = useVertexMetadataContext();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: Params, context: ValidExecuteContext) => {
        console.log('Approving VRTX allowance for staking contract', params);

        const vrtxContract = IERC20__factory.connect(
          protocolToken.address,
          context.vertexClient.context.signerOrProvider,
        );

        return vrtxContract.approve(
          context.vertexClient.context.contractAddresses.vrtxStaking,
          params.amount,
        );
      },
      [protocolToken.address],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ApproveStakingVrtxAllowance', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}

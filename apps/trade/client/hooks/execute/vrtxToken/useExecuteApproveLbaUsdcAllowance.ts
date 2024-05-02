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
export function useExecuteApproveLbaUsdcAllowance() {
  const { primaryQuoteToken } = useVertexMetadataContext();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: Params, context: ValidExecuteContext) => {
        console.log('Approving USDC allowance for LBA contract', params);

        const usdcContract = IERC20__factory.connect(
          primaryQuoteToken.address,
          context.vertexClient.context.signerOrProvider,
        );

        return usdcContract.approve(
          context.vertexClient.context.contractAddresses.vrtxLba,
          params.amount,
        );
      },
      [primaryQuoteToken.address],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ApproveLbaUsdcAllowance', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}

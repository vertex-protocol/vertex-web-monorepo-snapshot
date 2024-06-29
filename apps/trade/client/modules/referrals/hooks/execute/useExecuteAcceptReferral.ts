import { Fuul } from '@fuul/sdk';
import { useMutation } from '@tanstack/react-query';
import { getChainIdFromSigner, nowInSeconds } from '@vertex-protocol/client';
import { asyncResult } from '@vertex-protocol/utils';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { addressRefereeRewardsQueryKey } from 'client/modules/referrals/hooks/query/useAddressRefereeRewards';
import { addressReferralRewardsQueryKey } from 'client/modules/referrals/hooks/query/useAddressReferralRewards';
import { referrerForAddressQueryKey } from 'client/modules/referrals/hooks/query/useReferrerForAddress';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [
  addressRefereeRewardsQueryKey(),
  addressReferralRewardsQueryKey(),
  referrerForAddressQueryKey(),
];

export function useExecuteAcceptReferral() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: { referralCode: string },
        context: ValidExecuteContext,
      ) => {
        console.log('Accepting Referral', params);
        const message = `I confirm that I am accepting a referral from ${params.referralCode} at time ${nowInSeconds()}`;

        const signature = await context.signer.signMessage(message);
        // Provide chain ID if possible, but its an optional param. This is required for smart contract wallets though
        const [chainId] = await asyncResult(
          getChainIdFromSigner(context.signer),
        );

        return Fuul.sendConnectWallet({
          address: context.subaccount.address,
          signature,
          message,
          accountChainId: chainId != null ? Number(chainId) : undefined,
        });
      },
      [],
    ),
  );

  return useMutation({
    mutationFn,
    onSuccess() {
      refetchQueries();
    },
    onError(error, variables) {
      logExecuteError('AcceptReferral', error, variables);
    },
  });
}

import { Fuul } from '@fuul/sdk';
import { useMutation } from '@tanstack/react-query';
import { nowInSeconds } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { addressFuulRefereeRewardsQueryKey } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulRefereeRewards';
import { addressFuulReferralRewardsQueryKey } from 'client/modules/referrals/fuul/hooks/query/useAddressFuulReferralRewards';
import { fuulReferrerForAddressQueryKey } from 'client/modules/referrals/fuul/hooks/query/useFuulReferrerForAddress';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [
  addressFuulRefereeRewardsQueryKey(),
  addressFuulReferralRewardsQueryKey(),
  fuulReferrerForAddressQueryKey(),
];

export function useExecuteAcceptFuulReferral() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: { referralCode: string },
        context: ValidExecuteContext,
      ) => {
        console.log('Accepting Referral', params);
        const message = `I confirm that I am accepting a referral from ${params.referralCode} at time ${nowInSeconds()}`;

        const signature = await context.walletClient.signMessage({ message });

        return Fuul.sendConnectWallet({
          address: context.subaccount.address,
          signature,
          message,
          accountChainId: context.walletClient.chain.id,
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

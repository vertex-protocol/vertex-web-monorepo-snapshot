import { Fuul } from '@fuul/sdk';
import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { addressReferralCodeQueryKey } from 'client/modules/referrals/hooks/query/useAddressReferralCode';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [addressReferralCodeQueryKey()];

interface Params {
  code: string;
}

export function useExecuteUpsertAffiliateCode() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(async (params: Params, context: ValidExecuteContext) => {
      console.log('Upsert Affiliate Code', params);

      const hasCode = !!(await Fuul.getAffiliateCode(
        context.subaccount.address,
      ));

      const message = hasCode
        ? `I confirm that I am updating my code to ${params.code} on Fuul`
        : `I confirm that I am creating the ${params.code} code on Fuul`;

      const signature = await context.signer.signMessage(message);

      const execute = hasCode
        ? Fuul.updateAffiliateCode
        : Fuul.createAffiliateCode;

      return execute({
        address: context.subaccount.address,
        code: params.code,
        signature,
      });
    }, []),
  );

  return useMutation({
    mutationFn,
    onSuccess() {
      refetchQueries();
    },
    onError(error, variables) {
      logExecuteError('UpsertAffiliateCode', error, variables);
    },
  });
}

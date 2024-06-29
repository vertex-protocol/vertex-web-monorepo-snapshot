import { Fuul } from '@fuul/sdk';
import { asyncResult } from '@vertex-protocol/client';
import { useDebounceFn } from 'ahooks';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useExecuteUpsertAffiliateCode } from 'client/modules/referrals/hooks/execute/useExecuteUpsertAffiliateCode';
import { useAddressReferralCode } from 'client/modules/referrals/hooks/query/useAddressReferralCode';
import { useReferralLink } from 'client/modules/referrals/hooks/useReferralLink';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { watchFormError } from 'client/utils/form/watchFormError';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type CustomizeReferralLinkErrorType =
  | 'invalid_input' // Form input is not valid
  | 'code_taken'; // Code is taken

// Referral code can contain alphanumeric characters & hyphens
const referralCodeSchema = z
  .string()
  .min(0)
  .max(20)
  .regex(/^[a-zA-Z0-9-]+$/);

export function useCustomizeReferralLinkDialog() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const executeUpsertAffiliateCode = useExecuteUpsertAffiliateCode();
  const { data: referralCodeData } = useAddressReferralCode();

  useRunWithDelayOnCondition({
    condition: executeUpsertAffiliateCode.isSuccess,
    fn: hide,
  });

  const form = useForm({
    defaultValues: {
      code: '',
    },
    mode: 'onTouched',
  });

  const watchedCode = form.watch('code');
  const codeError: CustomizeReferralLinkErrorType | undefined = watchFormError(
    form,
    'code',
  );

  const { baseUrlWithQueryParam } = useReferralLink({
    referralCode: watchedCode,
  });

  // Sync custom code from server with form state
  const existingCustomReferralCode = referralCodeData?.isCustom
    ? referralCodeData?.referralCode
    : undefined;
  useEffect(() => {
    form.setValue('code', existingCustomReferralCode ?? '');
  }, [existingCustomReferralCode, form]);

  const formError = codeError;
  const codeDidChange = Boolean(
    watchedCode && watchedCode !== existingCustomReferralCode,
  );

  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeUpsertAffiliateCode.isPending) {
      return 'loading';
    }
    if (executeUpsertAffiliateCode.isSuccess) {
      return 'success';
    }
    if (formError || !codeDidChange) {
      return 'disabled';
    }
    return 'idle';
  }, [
    codeDidChange,
    executeUpsertAffiliateCode.isPending,
    executeUpsertAffiliateCode.isSuccess,
    formError,
  ]);

  const debouncedValidateCode = useDebounceFn(Fuul.isAffiliateCodeFree, {
    wait: 200,
  });

  const validateReferralCode = useCallback(
    async (
      code: string,
    ): Promise<CustomizeReferralLinkErrorType | undefined> => {
      if (code === existingCustomReferralCode) {
        return;
      }

      if (!referralCodeSchema.safeParse(code).success) {
        return 'invalid_input';
      }

      // `run` returns undefined if the debounced fn as a result of debouncing
      const validationResult = debouncedValidateCode.run(code);

      if (!validationResult) {
        return;
      }

      const [isFree, error] = await asyncResult(validationResult);

      if (error || !isFree) {
        return 'code_taken';
      }
    },
    [debouncedValidateCode, existingCustomReferralCode],
  );

  const onSubmit = useCallback(
    async ({ code }: { code: string }) => {
      const serverExecutionResult = executeUpsertAffiliateCode.mutateAsync({
        code,
      });

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Customize Referral Link Failed',
          executionData: {
            serverExecutionResult,
          },
        },
      });
    },
    [dispatchNotification, executeUpsertAffiliateCode],
  );

  return {
    baseUrlWithQueryParam,
    buttonState,
    existingCustomReferralCode,
    form,
    formError,
    onSubmit: form.handleSubmit(onSubmit),
    validateReferralCode,
    watchedCode,
  };
}

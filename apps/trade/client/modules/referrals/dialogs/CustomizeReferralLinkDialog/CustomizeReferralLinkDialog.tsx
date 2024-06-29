import { CompactInput } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { Form } from 'client/components/Form';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CustomizeReferralLinkSubmitButton } from 'client/modules/referrals/dialogs/CustomizeReferralLinkDialog/CustomizeReferralLinkSubmitButton';
import { useCustomizeReferralLinkDialog } from 'client/modules/referrals/dialogs/CustomizeReferralLinkDialog/hooks/useCustomizeReferralLinkDialog';
import { useCustomizeReferralLinkErrorTooltipContent } from 'client/modules/referrals/dialogs/CustomizeReferralLinkDialog/hooks/useCustomizeReferralLinkErrorTooltipContent';

export function CustomizeReferralLinkDialog() {
  const { hide } = useDialog();
  const {
    baseUrlWithQueryParam,
    buttonState,
    existingCustomReferralCode,
    form,
    formError,
    onSubmit,
    validateReferralCode,
    watchedCode,
  } = useCustomizeReferralLinkDialog();

  const customizeLinkErrorTooltipContent =
    useCustomizeReferralLinkErrorTooltipContent({ formError });

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Customize Your Link</BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3">
            {existingCustomReferralCode && (
              <div className="bg-surface-1 rounded p-2 text-xs">
                If you change your custom link, the previous custom one won’t
                work.
              </div>
            )}
            <CompactInput
              {...form.register('code', {
                validate: validateReferralCode,
              })}
              type="text"
              placeholder="Start typing"
              errorTooltipContent={customizeLinkErrorTooltipContent}
            />
            {watchedCode && (
              <ReferralLinkPreview
                referralCode={watchedCode}
                baseUrlWithQueryParam={baseUrlWithQueryParam}
              />
            )}
          </div>
          <CustomizeReferralLinkSubmitButton state={buttonState} />
        </Form>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

function ReferralLinkPreview({
  baseUrlWithQueryParam,
  referralCode,
}: {
  baseUrlWithQueryParam: string;
  referralCode: string;
}) {
  return (
    <div className="text-text-tertiary text-xs">
      Your referral link:
      <div>
        {baseUrlWithQueryParam}
        <span className="text-text-primary break-all">{referralCode}</span>
      </div>
    </div>
  );
}

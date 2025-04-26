import { CompactInput } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CustomizeFuulReferralLinkSubmitButton } from 'client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/CustomizeFuulReferralLinkSubmitButton';
import { useCustomizeFuulReferralLinkDialog } from 'client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/hooks/useCustomizeFuulReferralLinkDialog';
import { useCustomizeFuulReferralLinkErrorTooltipContent } from 'client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/hooks/useCustomizeFuulReferralLinkErrorTooltipContent';

export function CustomizeFuulReferralLinkDialog() {
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
  } = useCustomizeFuulReferralLinkDialog();

  const customizeLinkErrorTooltipContent =
    useCustomizeFuulReferralLinkErrorTooltipContent({ formError });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Customize Your Link
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-3">
            {existingCustomReferralCode && (
              <div className="bg-surface-1 rounded-sm p-2 text-xs">
                If you change your custom link, the previous custom one
                won&apos;t work.
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
          <CustomizeFuulReferralLinkSubmitButton state={buttonState} />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
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

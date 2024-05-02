import { Icons } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RememberMeSwitch } from 'client/modules/singleSignatureSessions/components/RememberMeSwitch';
import { SignatureModeSlowModeEntrypoint } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeEntrypoint';
import { SingleSignatureReapproveButton } from 'client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/SingleSignatureReapproveButton';
import { useSingleSignatureReapprovalDialog } from 'client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/useSingleSignatureReapprovalDialog';

export function SingleSignatureReapprovalDialog() {
  const { hide } = useDialog();
  const { buttonState, onSubmit, rememberMe, setRememberMe } =
    useSingleSignatureReapprovalDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>
        <div className="flex items-center gap-x-1.5">
          One-Click Trading <OneClickTradingOnPill />
        </div>
      </BaseDialog.Title>
      <BaseDialog.Body className="text-text-secondary flex flex-col gap-y-6 text-sm">
        <p>
          You need to approve this session to start trading or to use TP/SL
          orders. You can turn off One-Click Trading in settings after.
        </p>
        <SignatureModeSlowModeEntrypoint className="text-sm" />
        <div className="flex flex-col gap-y-3">
          <RememberMeSwitch
            disabled={buttonState === 'loading'}
            checked={rememberMe}
            onCheckedChange={setRememberMe}
          />
          <SingleSignatureReapproveButton
            onSubmit={onSubmit}
            buttonState={buttonState}
          />
        </div>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

function OneClickTradingOnPill() {
  return (
    <div className="text-3xs bg-overlay-accent/40 text-text-primary flex items-center gap-x-1 rounded-2xl px-2 py-0.5 leading-4">
      <Icons.BsFillLightningChargeFill size={8} />
      <span>ON</span>
    </div>
  );
}

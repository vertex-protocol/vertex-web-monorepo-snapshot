import { WarningPanel } from 'client/components/WarningPanel';
import { SignatureModeSettingsUserStateWarning } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/useSignatureModeDisable1CTDialogContent';

export function SignatureModeUserStateWarning({
  userStateWarning,
}: {
  userStateWarning?: SignatureModeSettingsUserStateWarning;
}) {
  if (!userStateWarning) return null;

  const warningContentData = {
    will_cancel_orders: {
      title: 'Limit & TP/SL orders will be cancelled',
      description: `Any existing limit and TP/SL orders will be cancelled when disabling 1CT.`,
    },
    last_allowed_switch: {
      title: 'Last change allowed for this week',
      description:
        "You can only enable 1-Click trading 5 times/week. If you change to Sign Every Transaction right now, you won't be able to enable 1CT again until next week.",
    },
  }[userStateWarning];

  return (
    <WarningPanel title={warningContentData.title}>
      {warningContentData.description}
    </WarningPanel>
  );
}

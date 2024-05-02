import { Icons } from '@vertex-protocol/web-ui';
import { SignatureModeSettingsUserStateWarning } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/useSignatureModeSettingsDialog';

export function SignatureModeUserStateWarning({
  userStateWarning,
}: {
  userStateWarning?: SignatureModeSettingsUserStateWarning;
}) {
  if (!userStateWarning) return null;

  const warningContentData = {
    will_cancel_orders: {
      title: 'Limit & TP/SL orders will be cancelled',
      description:
        'Any existing limit and TP/SL orders will be cancelled when switching to Sign Every Transaction mode.',
    },
    last_allowed_switch: {
      title: 'Last change allowed for this week',
      description:
        "You can only enable One-Click Trading 5 times/week. If you change to Sign Every Transaction right now, you won't be able to enable One-Click Trading again until next week.",
    },
  }[userStateWarning];

  return (
    <div className="flex flex-col gap-y-1.5">
      <div className="flex items-center gap-x-2 leading-4">
        <Icons.BsExclamationTriangle size={14} className="text-orange-400" />
        <span className="text-text-primary text-sm">
          {warningContentData.title}
        </span>
      </div>
      <div className="text-text-tertiary flex flex-col gap-y-4 whitespace-normal text-left text-xs">
        {warningContentData.description}
      </div>
    </div>
  );
}

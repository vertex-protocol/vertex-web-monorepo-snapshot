import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  joinClassNames,
  mergeClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  Icons,
} from '@vertex-protocol/web-ui';
import { StatusIndicator } from 'client/components/StatusIndicator';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';
import { SubaccountWithMetrics } from 'client/modules/subaccounts/hooks/useAllSubaccountsWithMetrics';

interface Props extends WithClassnames {
  subaccount: SubaccountWithMetrics;
  isActive: boolean;
}

export function ManageSubaccountsDialogSubaccountCard({
  subaccount,
  isActive,
  className,
}: Props) {
  const { setCurrentSubaccountName } = useSubaccountContext();
  const hoverStateOverlayClassnames = getStateOverlayClassNames({});
  const { push } = useDialog();

  return (
    <div
      className={mergeClassNames(
        'bg-surface-1 text-text-primary overflow-hidden rounded-lg',
        className,
      )}
    >
      <Button
        className={joinClassNames(
          'w-full justify-between px-3 py-2 text-xs',
          'text-text-secondary hover:text-text-primary transition-colors',
          isActive ? 'bg-positive-muted' : 'bg-surface-3',
        )}
        onClick={() =>
          push({
            type: 'edit_user_profile',
            params: { subaccountName: subaccount.subaccountName },
          })
        }
        endIcon={<Icons.PencilSimple size={12} className="ml-auto" />}
      >
        <div className="text-text-primary flex items-center gap-x-1 leading-none">
          {isActive ? (
            <>
              <StatusIndicator sizeVariant="sm" colorVariant="positive" />
              Current
            </>
          ) : (
            'Account'
          )}
        </div>
      </Button>
      <Button
        className={joinClassNames(
          'flex w-full flex-col items-center gap-y-1 p-3 pb-4 sm:gap-y-2',
          hoverStateOverlayClassnames,
        )}
        onClick={() => {
          if (!isActive) {
            setCurrentSubaccountName(subaccount.subaccountName);
          }
        }}
      >
        {/* `w-full` needed to truncate username. */}
        <div className="flex w-full flex-col items-center gap-y-2 text-xs sm:text-sm">
          <ProfileAvatarIcon
            avatar={subaccount.profile.avatar}
            size={40}
            subaccountName={subaccount.subaccountName}
          />
          <span className="w-full truncate">{subaccount.profile.username}</span>
        </div>
        <span className="w-full truncate sm:text-xl">
          {formatNumber(subaccount.portfolioValueUsd, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
        </span>
      </Button>
    </div>
  );
}

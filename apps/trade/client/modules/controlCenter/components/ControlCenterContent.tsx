import {
  Divider,
  Icons,
  IconType,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useMemo } from 'react';
import { DialogType } from '../../app/dialogs/types';
import { ControlCenterHeader } from './ControlCenterHeader/ControlCenterHeader';
import { ControlCenterTabs } from './ControlCenterTabs/ControlCenterTabs';
import { ControlCenterUserErrorCTA } from './ControlCenterUserErrorCTA';
import { EdgeFooter } from './EdgeFooter';
import { OneClickTradingButton } from './OneClickTradingButton';

interface ActionItemData {
  icon: IconType;
  label: string;
  dialogType: Extract<DialogType, 'deposit' | 'withdraw' | 'borrow' | 'repay'>;
  disabled: boolean;
}

interface Props {
  onShowSettingsClick: () => void;
}

export function ControlCenterContent({ onShowSettingsClick }: Props) {
  const { trackEvent } = useAnalyticsContext();
  const { show } = useDialog();
  const userStateError = useUserStateError();
  const userActionState = useUserActionState();

  const actionItemsData = useMemo<ActionItemData[]>(
    () => [
      {
        icon: Icons.MdArrowDownward,
        label: 'Deposit',
        dialogType: 'deposit',
        disabled: userActionState === 'block_all',
      },
      {
        icon: Icons.MdArrowUpward,
        label: 'Withdraw',
        dialogType: 'withdraw',
        disabled: userActionState !== 'allow_all',
      },
      {
        icon: Icons.MdOutlineSwapHorizontalCircle,
        label: 'Borrow',
        dialogType: 'borrow',
        disabled: userActionState !== 'allow_all',
      },
      {
        icon: Icons.MdUpdate,
        label: 'Repay',
        dialogType: 'repay',
        disabled: userActionState === 'block_all',
      },
    ],
    [userActionState],
  );

  return (
    <>
      <ControlCenterHeader
        userStateError={userStateError}
        onShowSettingsClick={onShowSettingsClick}
      />
      <div className="flex flex-1 flex-col justify-between gap-y-4">
        <div className="flex flex-col gap-y-4">
          <Divider className="bg-surface-2" />
          <div className="flex flex-col gap-y-6">
            {userStateError && (
              <ControlCenterUserErrorCTA userStateError={userStateError} />
            )}
            <div className="flex flex-col gap-y-4">
              <OneClickTradingButton
                disabled={userActionState === 'block_all'}
              />
              <Divider className="bg-surface-2" />
              <div className="grid grid-cols-2 gap-3">
                {actionItemsData.map(
                  ({ icon: Icon, label, dialogType, disabled }) => {
                    return (
                      <SecondaryButton
                        key={label}
                        className="flex justify-start gap-x-2.5 font-medium"
                        size="lg"
                        disabled={disabled}
                        onClick={() => {
                          show({ type: dialogType, params: {} });

                          if (dialogType === 'deposit') {
                            trackEvent({
                              type: 'deposit_clicked',
                              data: { fromLocation: 'sidebar' },
                            });
                          }
                        }}
                      >
                        <Icon size={18} />
                        <div className="text-sm">{label}</div>
                      </SecondaryButton>
                    );
                  },
                )}
              </div>
            </div>
            <ControlCenterTabs />
          </div>
        </div>
        <EdgeFooter />
      </div>
    </>
  );
}

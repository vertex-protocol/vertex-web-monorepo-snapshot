import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Card,
  Divider,
  ScrollShadowsContainer,
  TextButton,
  Z_INDEX,
} from '@vertex-protocol/web-ui';
import { SwitcherDropdownItemButton } from 'client/components/SwitcherDropdownItemButton';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';
import { useAllSubaccountsWithMetrics } from 'client/modules/subaccounts/hooks/useAllSubaccountsWithMetrics';
import { forwardRef } from 'react';

export const SubaccountSwitcherDropdownContent = forwardRef<
  HTMLDivElement,
  DropdownMenu.DropdownMenuContentProps
>(function SubaccountSwitcherDropdownContent({ className, ...rest }, ref) {
  const { currentSubaccount, setCurrentSubaccountName } =
    useSubaccountContext();
  const subaccountsWithMetrics = useAllSubaccountsWithMetrics();
  const { push } = useDialog();

  return (
    <Card
      className={joinClassNames(
        'bg-surface-2 flex flex-col gap-y-2 p-3',
        Z_INDEX.pagePopover,
        className,
      )}
      ref={ref}
      {...rest}
    >
      <DropdownMenu.Label className="text-xs">Your Accounts</DropdownMenu.Label>
      <DropdownMenu.Group asChild>
        <ScrollShadowsContainer
          orientation="vertical"
          className="flex max-h-72 flex-col gap-y-0.5 text-sm"
        >
          {subaccountsWithMetrics.map(
            ({ subaccountName, profile, portfolioValueUsd }) => {
              const isActive = subaccountName === currentSubaccount.name;
              const { username, avatar } = profile;

              return (
                <SwitcherDropdownItemButton
                  key={subaccountName}
                  className="gap-x-3"
                  label={username}
                  sublabel={formatNumber(portfolioValueUsd, {
                    formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
                  })}
                  active={isActive}
                  startIcon={
                    <ProfileAvatarIcon
                      avatar={avatar}
                      size={32}
                      subaccountName={subaccountName}
                    />
                  }
                  onClick={() => {
                    if (!isActive) {
                      setCurrentSubaccountName(subaccountName);
                    }
                  }}
                />
              );
            },
          )}
        </ScrollShadowsContainer>
      </DropdownMenu.Group>
      <DropdownMenu.Separator asChild>
        <Divider />
      </DropdownMenu.Separator>
      <DropdownMenu.Group className="flex flex-col items-start gap-y-1.5 text-xs">
        <DropdownMenu.Item asChild>
          <TextButton
            onClick={() => push({ type: 'manage_subaccounts', params: {} })}
          >
            Add &amp; Manage Accounts
          </TextButton>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <TextButton
            onClick={() =>
              push({ type: 'subaccount_quote_transfer', params: {} })
            }
          >
            Transfer Funds
          </TextButton>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </Card>
  );
});

import {
  DropdownMenuContentProps,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithRef } from '@vertex-protocol/web-common';
import {
  Divider,
  DropdownUi,
  ScrollShadowsContainer,
  TextButton,
} from '@vertex-protocol/web-ui';
import { SwitcherDropdownItemButton } from 'client/components/SwitcherDropdownItemButton';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProfileAvatarIcon } from 'client/modules/subaccounts/components/ProfileAvatarIcon';
import { useAllSubaccountsWithMetrics } from 'client/modules/subaccounts/hooks/useAllSubaccountsWithMetrics';

export function SubaccountSwitcherDropdownContent({
  className,
  ...rest
}: WithRef<DropdownMenuContentProps, HTMLDivElement>) {
  const { currentSubaccount, setCurrentSubaccountName } =
    useSubaccountContext();
  const subaccountsWithMetrics = useAllSubaccountsWithMetrics();
  const { push } = useDialog();

  return (
    <DropdownUi.Content
      className={joinClassNames('gap-y-2 p-3', className)}
      header={
        <DropdownMenuLabel className="text-xs">Your Accounts</DropdownMenuLabel>
      }
      {...rest}
    >
      <DropdownMenuGroup asChild>
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
      </DropdownMenuGroup>
      <DropdownMenuSeparator asChild>
        <Divider />
      </DropdownMenuSeparator>
      <DropdownMenuGroup className="flex flex-col items-start gap-y-1.5 text-xs">
        <DropdownMenuItem asChild>
          <TextButton
            colorVariant="secondary"
            onClick={() => push({ type: 'manage_subaccounts', params: {} })}
          >
            Add &amp; Manage Accounts
          </TextButton>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <TextButton
            colorVariant="secondary"
            onClick={() =>
              push({ type: 'subaccount_quote_transfer', params: {} })
            }
          >
            Transfer Funds
          </TextButton>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownUi.Content>
  );
}

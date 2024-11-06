import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Popover from '@radix-ui/react-popover';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  COMMON_TRANSPARENCY_COLORS,
  Divider,
  Icons,
  NavBarCardButton,
  TextButton,
} from '@vertex-protocol/web-ui';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { AccountCenterWalletIcon } from 'client/modules/accountCenter/components/AccountCenterWalletIcon';
import { AppVersion } from 'client/modules/app/components/AppVersion';
import { LatencyMonitor } from 'client/modules/app/components/LatencyMonitor';
import { StatusButton } from 'client/modules/app/components/StatusButton';
import { UpcomingMaintenanceLink } from 'client/modules/app/components/UpcomingMaintenanceLink';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useAlertUpcomingMaintenanceWindow } from 'client/modules/app/hooks/useAlertUpcomingMaintenanceWindow';
import { ChainEnvSwitcherDropdown } from 'client/modules/app/navBar/chainEnvSwitcher/ChainEnvSwitcherDropdown';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { AppNavLogo } from 'client/modules/app/navBar/components/AppNavLogo/AppNavLogo';
import { useAppNavItems } from 'client/modules/app/navBar/hooks/useAppNavItems';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { openMobileNavAtom } from 'client/store/navigationStore';
import { useAtom } from 'jotai';
import Link from 'next/link';

function MobileNavMenu({ className }: WithClassnames) {
  const [, setOpenMobileNav] = useAtom(openMobileNavAtom);
  const getIsActiveRoute = useGetIsActiveRoute();
  const alertUpcomingMaintenanceWindow = useAlertUpcomingMaintenanceWindow();
  const { show } = useDialog();
  const appNavItems = useAppNavItems();

  return (
    <div
      className={joinClassNames(
        'w-screen',
        'no-scrollbar flex flex-col justify-between overflow-y-auto',
        'bg-background border-t',
        COMMON_TRANSPARENCY_COLORS.border,
        className,
      )}
      style={{
        height: 'var(--radix-popper-available-height)',
      }}
    >
      <NavigationMenu.Root orientation="vertical">
        <NavigationMenu.List className="flex flex-col p-4">
          {appNavItems.map((navItem) => {
            if (navItem.type === 'link') {
              return (
                <NavigationMenu.Item key={navItem.id}>
                  <NavigationMenu.Link asChild>
                    <AppNavItemButton
                      withMobilePadding
                      as={Link}
                      active={getIsActiveRoute(navItem.basePath)}
                      key={navItem.id}
                      disabled={navItem.disabled}
                      href={navItem.href}
                      onClick={() => setOpenMobileNav(false)}
                    >
                      {navItem.label}
                    </AppNavItemButton>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            } else if (navItem.type === 'custom') {
              const { Mobile } = navItem.content;
              return <Mobile key={navItem.id} />;
            }
          })}
        </NavigationMenu.List>
      </NavigationMenu.Root>
      <div className="flex flex-col gap-y-2 p-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-2">
            <StatusButton />
            <TextButton
              className="text-text-secondary"
              onClick={() => {
                setOpenMobileNav(false);
                show({ type: 'help_center', params: {} });
              }}
            >
              Need Help?
            </TextButton>
          </div>
          <div className="flex gap-x-2">
            <AppVersion />
            <LatencyMonitor />
          </div>
        </div>
        {alertUpcomingMaintenanceWindow && (
          <>
            <Divider />
            <UpcomingMaintenanceLink />
          </>
        )}
      </div>
    </div>
  );
}

export function MobileNavBarContent() {
  const { show } = useDialog();
  const userStateError = useUserStateError();
  const [openMobileNav, setOpenMobileNav] = useAtom(openMobileNavAtom);

  const isConnected = useIsConnected();

  const navDrawerButton = (
    <NavBarCardButton
      // `Popover.Trigger` is needed as a container for proper alignment of `Popover.Content`
      // Using `NavBarCardButton` as a `div` for styling of the "button" content
      as="div"
      className={joinClassNames('w-max p-2', openMobileNav && 'bg-surface-2')}
    >
      {openMobileNav ? <Icons.X size={20} /> : <Icons.List size={20} />}
    </NavBarCardButton>
  );

  const onAccountCenterButtonClick = () => {
    setOpenMobileNav(false);
    if (isConnected) {
      show({
        type: 'account_center',
        params: {},
      });
    } else {
      show({
        type: 'connect',
        params: {},
      });
    }
  };

  // To remain consistent with other nav bar buttons, the account center button's icon is set to 20px
  const accountCenterButton = (
    <NavBarCardButton onClick={onAccountCenterButtonClick}>
      {isConnected ? (
        <AccountCenterWalletIcon userStateError={userStateError} size={20} />
      ) : (
        <Icons.Wallet className="text-text-secondary" size={20} />
      )}
    </NavBarCardButton>
  );

  const chainEnvSwitcher = (
    <BrandSpecificContent enabledBrands={['vertex']}>
      <ChainEnvSwitcherDropdown />
    </BrandSpecificContent>
  );

  return (
    <Popover.Root open={openMobileNav} onOpenChange={setOpenMobileNav}>
      <div className="h-navbar grid grid-cols-3 items-center px-4">
        <Popover.Trigger className="h-full w-min">
          {navDrawerButton}
        </Popover.Trigger>
        <AppNavLogo className="justify-self-center" />
        <div className="flex w-max gap-x-2 justify-self-end">
          {accountCenterButton}
          {chainEnvSwitcher}
        </div>
      </div>
      <Popover.Content side="top" align="end">
        <MobileNavMenu />
      </Popover.Content>
    </Popover.Root>
  );
}

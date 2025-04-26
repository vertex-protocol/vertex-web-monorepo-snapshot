import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { NavBarCardButton, PrimaryButton } from '@vertex-protocol/web-ui';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { AccountCenterWalletDisplayName } from 'client/modules/accountCenter/components/AccountCenterWalletDisplayName';
import { AccountCenterWalletIcon } from 'client/modules/accountCenter/components/AccountCenterWalletIcon';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { NavAccountInfoPinsDropdown } from 'client/modules/app/navBar/accountInfo/NavAccountInfoPinsDropdown';
import { ChainEnvSwitcherDropdown } from 'client/modules/app/navBar/chainEnvSwitcher/ChainEnvSwitcherDropdown';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { AppNavLogo } from 'client/modules/app/navBar/components/AppNavLogo/AppNavLogo';
import { useAppNavItems } from 'client/modules/app/navBar/hooks/useAppNavItems';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { CommandCenterNavButton } from 'client/modules/commandCenter/components/CommandCenterNavButton';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import Link from 'next/link';

export function DesktopNavBarContent() {
  const { show } = useDialog();
  const getIsActiveRoute = useGetIsActiveRoute();
  const isConnected = useIsConnected();
  const userStateError = useUserStateError();
  const appNavItems = useAppNavItems();

  const navButtons = appNavItems.map((navItem) => {
    if (navItem.type === 'link') {
      return (
        <NavigationMenu.Item key={navItem.id}>
          <NavigationMenu.Link asChild>
            <AppNavItemButton
              as={Link}
              disabled={navItem.disabled}
              href={navItem.href}
              active={getIsActiveRoute(navItem.basePath)}
            >
              {navItem.label}
            </AppNavItemButton>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      );
    } else {
      const { Desktop } = navItem.content;
      return <Desktop key={navItem.id} />;
    }
  });

  // Show connect wallet button if not connected, or entrypoint to account center if connected
  const accountButton = (() => {
    if (!isConnected) {
      return (
        <PrimaryButton
          size="lg"
          className="flex-1"
          onClick={() => show({ type: 'connect', params: {} })}
        >
          Connect Wallet
        </PrimaryButton>
      );
    }

    return (
      <NavBarCardButton
        className="text-text-primary flex-1 justify-start gap-x-2 text-xs"
        startIcon={
          <AccountCenterWalletIcon userStateError={userStateError} size={18} />
        }
        onClick={() =>
          show({
            type: 'account_center',
            params: {},
          })
        }
      >
        <AccountCenterWalletDisplayName />
      </NavBarCardButton>
    );
  })();

  const chainEnvSwitcher = (
    <BrandSpecificContent enabledBrands={['vertex']}>
      <ChainEnvSwitcherDropdown />
    </BrandSpecificContent>
  );

  return (
    <div className="h-navbar flex w-full items-center gap-x-3 pr-3 pl-6">
      <div className="flex items-center">
        <div className="pr-4">
          <AppNavLogo />
        </div>
        <NavigationMenu.Root delayDuration={100}>
          <NavigationMenu.List className="flex items-center text-sm">
            {navButtons}
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
      <div className="flex-1" />
      {isConnected && <NavAccountInfoPinsDropdown />}
      <div className="h-desktop-navbar-item flex w-80 gap-x-3">
        <CommandCenterNavButton />
        {accountButton}
        {chainEnvSwitcher}
      </div>
    </div>
  );
}

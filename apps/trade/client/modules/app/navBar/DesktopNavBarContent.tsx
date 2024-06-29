import { useEVMContext } from '@vertex-protocol/react-client';
import { NavBarCardButton, PrimaryButton } from '@vertex-protocol/web-ui';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { AccountCenterWalletIcon } from 'client/modules/accountCenter/components/AccountCenterWalletIcon';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { NavAccountInfoPinsPopover } from 'client/modules/app/navBar/accountInfo/NavAccountInfoPinsPopover';
import { ChainSwitcherPopover } from 'client/modules/app/navBar/chainSwitcher/ChainSwitcherPopover';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { useAppNavItems } from 'client/modules/app/navBar/hooks/useAppNavItems';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';
import { CommandCenterNavButton } from 'client/modules/commandCenter/components/CommandCenterNavButton';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { getTruncatedAddress } from 'client/utils/getTruncatedAddress';
import Link from 'next/link';
import { AppNavLogo } from './components/AppNavLogo/AppNavLogo';

export function DesktopNavBarContent() {
  const { show } = useDialog();
  const { connectionStatus } = useEVMContext();
  const getIsActiveRoute = useGetIsActiveRoute();
  const isConnected = connectionStatus.type === 'connected';
  const userStateError = useUserStateError();
  const [isAddressPrivate] = usePrivacySetting('isAddressPrivate');
  const appNavItems = useAppNavItems();

  const navButtons = appNavItems.map((navItem) => {
    if (navItem.type === 'link') {
      return (
        <AppNavItemButton
          as={Link}
          key={navItem.id}
          disabled={navItem.disabled}
          href={navItem.href}
          active={getIsActiveRoute(navItem.basePath)}
        >
          {navItem.label}
        </AppNavItemButton>
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
        className="text-text-primary flex-1 gap-x-2 text-xs"
        startIcon={
          <AccountCenterWalletIcon userStateError={userStateError} size={18} />
        }
        onClick={() =>
          show({
            type: 'account_center',
            params: { initialShowSettingsContent: false },
          })
        }
      >
        <PrivateContent
          isPrivate={isAddressPrivate}
          className="flex-1 text-left"
        >
          {getTruncatedAddress(connectionStatus?.address ?? '', 4)}
        </PrivateContent>
      </NavBarCardButton>
    );
  })();

  const chainSwitcher = (
    <BrandSpecificContent enabledBrands={['vertex']}>
      <ChainSwitcherPopover />
    </BrandSpecificContent>
  );

  return (
    <nav className="h-navbar flex w-full items-center gap-x-3 pl-6 pr-3">
      <div className="flex items-center gap-x-2 text-sm">
        <div className="pr-4">
          <AppNavLogo />
        </div>
        {navButtons}
      </div>
      <div className="flex-1" />
      {isConnected && <NavAccountInfoPinsPopover />}
      <div className="h-desktop-navbar-item flex w-80 gap-x-3">
        <CommandCenterNavButton />
        {accountButton}
        {chainSwitcher}
      </div>
    </nav>
  );
}

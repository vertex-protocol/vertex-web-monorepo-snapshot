import { getTruncatedAddress } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { NavBarCardButton, PrimaryButton } from '@vertex-protocol/web-ui';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BrandSpecificContent } from 'client/modules/brand/components/BrandSpecificContent';
import { ControlCenterWalletIcon } from 'client/modules/controlCenter/components/ControlCenterHeader/ControlCenterWalletIcon';
import { NavAccountInfoPinsPopover } from 'client/modules/navigation/accountInfo/NavAccountInfoPinsPopover';
import { ChainSwitcherPopover } from 'client/modules/navigation/chainSwitcher/ChainSwitcherPopover';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { useAppNavItems } from 'client/modules/navigation/hooks/useAppNavItems';
import { useGetIsActiveRoute } from 'client/modules/navigation/hooks/useGetIsActiveRoute';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { SingleSignatureStatusIcon } from 'client/modules/singleSignatureSessions/components/SingleSignatureStatusIcon';
import { clientEnv } from 'common/environment/clientEnv';
import Link from 'next/link';
import { PrivateContent } from '../privacy/components/PrivateContent';
import { useIsSingleSignatureSession } from '../singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { AppNavLogo } from './components/AppNavLogo/AppNavLogo';

export function DesktopNavBarContent() {
  const { show } = useDialog();
  const { connectionStatus } = useEVMContext();
  const getIsActiveRoute = useGetIsActiveRoute();
  const isConnected = connectionStatus.type === 'connected';
  const userStateError = useUserStateError();
  const [isAddressPrivate] = usePrivacySetting('isAddressPrivate');
  const appNavItems = useAppNavItems();
  const isSignOnce = useIsSingleSignatureSession();

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
        startIcon={<ControlCenterWalletIcon userStateError={userStateError} />}
        endIcon={<SingleSignatureStatusIcon isSignOnce={isSignOnce} />}
        onClick={() =>
          show({
            type: 'control_center',
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

  const chainSwitcher = clientEnv.base.enableExperimentalFeatures && (
    <BrandSpecificContent enabledBrands={['vertex']}>
      <ChainSwitcherPopover />
    </BrandSpecificContent>
  );

  return (
    <nav className="h-navbar flex w-full items-center gap-x-4 pl-6 pr-3">
      <div className="flex items-center gap-x-2 text-sm">
        <div className="pr-4">
          <AppNavLogo />
        </div>
        {navButtons}
      </div>
      <div className="flex-1" />
      {isConnected && <NavAccountInfoPinsPopover />}
      <div className="h-desktop-navbar-item flex w-56 gap-x-3">
        {accountButton}
        {chainSwitcher}
      </div>
    </nav>
  );
}

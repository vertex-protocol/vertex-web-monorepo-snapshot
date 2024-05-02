import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import {
  Button,
  Divider,
  Icons,
  NavBarCardButton,
} from '@vertex-protocol/web-ui';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BrandSpecificContent } from 'client/modules/brand/components/BrandSpecificContent';
import { ControlCenterWalletIcon } from 'client/modules/controlCenter/components/ControlCenterHeader/ControlCenterWalletIcon';
import { ChainSwitcherPopover } from 'client/modules/navigation/chainSwitcher/ChainSwitcherPopover';
import { useAppNavItems } from 'client/modules/navigation/hooks/useAppNavItems';
import { useGetIsActiveRoute } from 'client/modules/navigation/hooks/useGetIsActiveRoute';
import { openMobileNavAtom } from 'client/store/navigationStore';
import { clientEnv } from 'common/environment/clientEnv';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { StatusButton } from '../app/components/StatusButton';
import { UpcomingMaintenance } from '../app/components/UpcomingMaintenance';
import { useAlertUpcomingMaintenanceWindow } from '../app/hooks/useAlertUpcomingMaintenanceWindow';
import { AppNavItemButton } from './components/AppNavItemButton';
import { AppNavLogo } from './components/AppNavLogo/AppNavLogo';

function MobileNavMenu({ className }: WithClassnames) {
  const [, setOpenMobileNav] = useAtom(openMobileNavAtom);
  const getIsActiveRoute = useGetIsActiveRoute();
  const alertUpcomingMaintenanceWindow = useAlertUpcomingMaintenanceWindow();
  const { show } = useDialog();
  const appNavItems = useAppNavItems();

  return (
    <div
      className={joinClassNames(
        'h-[calc(100vh-theme(height.navbar))] w-screen',
        'no-scrollbar flex flex-col justify-between overflow-y-auto',
        'bg-background border-overlay-divider/10 border-t',
        className,
      )}
    >
      <div className="flex flex-col p-4">
        {appNavItems.map((navItem) => {
          if (navItem.type === 'link') {
            return (
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
            );
          } else if (navItem.type === 'custom') {
            const { Mobile } = navItem.content;
            return <Mobile key={navItem.id} />;
          }
        })}
      </div>
      <div className="flex flex-col gap-y-3 p-3">
        <div className="flex gap-x-4">
          <StatusButton />
          <Button
            className="text-text-tertiary text-xs"
            onClick={() => show({ type: 'help_center', params: {} })}
          >
            Need Help?
          </Button>
        </div>
        {alertUpcomingMaintenanceWindow && (
          <>
            <Divider />
            <UpcomingMaintenance className="px-1" />
          </>
        )}
      </div>
    </div>
  );
}

export function MobileNavBarContent() {
  const { show } = useDialog();
  const userStateError = useUserStateError();
  const { connectionStatus } = useEVMContext();
  const [openMobileNav, setOpenMobileNav] = useAtom(openMobileNavAtom);

  const isConnected = connectionStatus.type === 'connected';

  const navDrawerButton = (
    <NavBarCardButton
      onClick={() => setOpenMobileNav(!openMobileNav)}
      className={joinClassNames('w-max p-2', openMobileNav && 'bg-surface-2')}
    >
      {openMobileNav ? <Icons.MdClose size={20} /> : <Icons.MdMenu size={20} />}
    </NavBarCardButton>
  );

  const chainSwitcher = clientEnv.base.enableExperimentalFeatures && (
    <BrandSpecificContent enabledBrands={['vertex']}>
      <ChainSwitcherPopover />
    </BrandSpecificContent>
  );

  const onControlCenterButtonClick = () => {
    setOpenMobileNav(false);
    if (isConnected) {
      show({
        type: 'control_center',
        params: { initialShowSettingsContent: false },
      });
    } else {
      show({
        type: 'connect',
        params: {},
      });
    }
  };

  const menuContent = (() => {
    if (!openMobileNav) return null;
    return <MobileNavMenu className="absolute left-0 top-full" />;
  })();

  return (
    <div className="relative">
      <div className="h-navbar grid grid-cols-3 items-center px-4">
        {navDrawerButton}
        <AppNavLogo className="justify-self-center" />
        <div className="flex w-max gap-x-2 justify-self-end">
          <NavBarCardButton
            className="p-2"
            onClick={onControlCenterButtonClick}
          >
            <ControlCenterWalletIcon userStateError={userStateError} />
          </NavBarCardButton>
          {chainSwitcher}
        </div>
      </div>
      {menuContent}
    </div>
  );
}

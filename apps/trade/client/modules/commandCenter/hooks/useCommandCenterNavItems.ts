import {
  IconComponent,
  Icons,
  imageToIconComponent,
} from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { IMAGES } from 'common/brandMetadata/images';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const VertexIcon = imageToIconComponent({
  src: IMAGES.brandMonochromeIcon,
  alt: '',
});

export interface NavItem {
  label: string;
  icon: IconComponent;
  action: () => void;
  actionText: string;
  searchKey: string;
  type: 'navItems';
}

export function useCommandCenterNavItems() {
  const { show } = useDialog();
  const router = useRouter();
  const { isOnrampEnabled, isBridgeEnabled, isStakeActionEnabled } =
    useEnabledFeatures();
  const isConnected = useIsConnected();

  const canShowDepositOrRepay = isConnected;
  const canShowTransfer = isConnected;
  const canShowWithdrawOrBorrow = isConnected;
  const canShowOnramp = isOnrampEnabled && isConnected;
  const canShowBridge = isBridgeEnabled && isConnected;
  const canShowStake = isStakeActionEnabled && isConnected;

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: 'Balances',
        icon: Icons.Coins,
        action: () => router.push(ROUTES.portfolio.balances),
        actionText: 'Go To Page',
        searchKey: 'Balances',
        type: 'navItems' as const,
      },
      {
        label: 'Perp Positions',
        icon: Icons.Pulse,
        action: () => router.push(ROUTES.portfolio.positions),
        actionText: 'Go To Page',
        searchKey: 'Perp Positions',
        type: 'navItems' as const,
      },
      {
        label: 'History',
        icon: Icons.ClockClockwise,
        action: () => router.push(ROUTES.portfolio.history),
        actionText: 'Go To Page',
        searchKey: 'History',
        type: 'navItems' as const,
      },
      ...(canShowDepositOrRepay
        ? [
            {
              label: 'Deposit',
              icon: Icons.ArrowDownLeft,
              action: () => show({ type: 'deposit', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Deposit',
              type: 'navItems' as const,
            },
            {
              label: 'Repay',
              icon: Icons.ArrowsClockwise,
              action: () => show({ type: 'repay', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Repay',
              type: 'navItems' as const,
            },
          ]
        : []),
      ...(canShowTransfer
        ? [
            {
              label: 'Transfer funds',
              icon: Icons.ArrowsLeftRight,
              action: () =>
                show({ type: 'subaccount_quote_transfer', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Transfer funds',
              type: 'navItems' as const,
            },
          ]
        : []),
      ...(canShowWithdrawOrBorrow
        ? [
            {
              label: 'Withdraw',
              icon: Icons.ArrowUpRight,
              action: () => show({ type: 'withdraw', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Withdraw',
              type: 'navItems' as const,
            },
            {
              label: 'Borrow',
              icon: Icons.ArrowsLeftRight,
              action: () => show({ type: 'borrow', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Borrow',
              type: 'navItems' as const,
            },
          ]
        : []),
      ...(canShowOnramp
        ? [
            {
              label: 'Onramp',
              icon: Icons.CurrencyCircleDollar,
              action: () => show({ type: 'transak_onramp_notice', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Onramp',
              type: 'navItems' as const,
            },
          ]
        : []),
      ...(canShowBridge
        ? [
            {
              label: 'Bridge/Cross-Chain',
              icon: Icons.ShuffleSimple,
              action: () => show({ type: 'bridge', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Bridge/Cross-Chain',
              type: 'navItems' as const,
            },
          ]
        : []),
      ...(canShowStake
        ? [
            {
              label: 'Stake',
              icon: VertexIcon,
              action: () => show({ type: 'stake_v2_vrtx', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Stake',
              type: 'navItems' as const,
            },
          ]
        : []),
    ],
    [
      canShowTransfer,
      canShowDepositOrRepay,
      canShowWithdrawOrBorrow,
      canShowOnramp,
      canShowBridge,
      canShowStake,
      router,
      show,
    ],
  );

  return { navItems };
}

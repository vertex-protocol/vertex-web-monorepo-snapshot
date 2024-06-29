import { useEVMContext } from '@vertex-protocol/react-client';
import { IconType, Icons, imageToIconComponent } from '@vertex-protocol/web-ui';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { IMAGES } from 'common/brandMetadata/images';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const VertexIcon = imageToIconComponent({
  src: IMAGES.brandMonochromeIcon,
  alt: '',
});

export interface NavItem {
  label: string;
  icon: IconType;
  action: () => void;
  actionText: string;
  searchKey: string;
  type: 'navItems';
}

export function useCommandCenterNavItems() {
  const { show } = useDialog();
  const router = useRouter();
  const { connectionStatus } = useEVMContext();

  const userActionState = useUserActionState();

  const canShowDepositOrRepay = userActionState !== 'block_all';
  const canShowWithdrawOrBorrow = userActionState === 'allow_all';
  const canShowOnramp =
    useIsEnabledForChainIds([...ARB_CHAIN_IDS, ...MANTLE_CHAIN_IDS]) &&
    connectionStatus.type === 'connected';
  const canShowBridge =
    useIsEnabledForChainIds([
      ...ARB_CHAIN_IDS,
      ...MANTLE_CHAIN_IDS,
      ...BLAST_CHAIN_IDS,
    ]) && connectionStatus.type === 'connected';
  const canShowStake =
    useIsEnabledForChainIds(ARB_CHAIN_IDS) && userActionState !== 'block_all';

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: 'Balances',
        icon: Icons.PiCoins,
        action: () => router.push(ROUTES.portfolio.balances),
        actionText: 'Go To Page',
        searchKey: 'Balances',
        type: 'navItems' as const,
      },
      {
        label: 'Perp Positions',
        icon: Icons.PiPulse,
        action: () => router.push(ROUTES.portfolio.positions),
        actionText: 'Go To Page',
        searchKey: 'Perp Positions',
        type: 'navItems' as const,
      },
      {
        label: 'History',
        icon: Icons.PiClockClockwise,
        action: () => router.push(ROUTES.portfolio.history),
        actionText: 'Go To Page',
        searchKey: 'History',
        type: 'navItems' as const,
      },
      ...(canShowDepositOrRepay
        ? [
            {
              label: 'Deposit',
              icon: Icons.PiArrowDownLeft,
              action: () => show({ type: 'deposit', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Deposit',
              type: 'navItems' as const,
            },
            {
              label: 'Repay',
              icon: Icons.PiArrowsClockwise,
              action: () => show({ type: 'repay', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Repay',
              type: 'navItems' as const,
            },
          ]
        : []),
      ...(canShowWithdrawOrBorrow
        ? [
            {
              label: 'Withdraw',
              icon: Icons.PiArrowUpRight,
              action: () => show({ type: 'withdraw', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Withdraw',
              type: 'navItems' as const,
            },
            {
              label: 'Borrow',
              icon: Icons.PiArrowsLeftRight,
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
              icon: Icons.PiCurrencyCircleDollar,
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
              icon: Icons.PiShuffleSimple,
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
              action: () => show({ type: 'stake_vrtx', params: {} }),
              actionText: 'Open Dialog',
              searchKey: 'Stake',
              type: 'navItems' as const,
            },
          ]
        : []),
    ],
    [
      show,
      router,
      canShowDepositOrRepay,
      canShowWithdrawOrBorrow,
      canShowOnramp,
      canShowBridge,
      canShowStake,
    ],
  );

  return { navItems };
}

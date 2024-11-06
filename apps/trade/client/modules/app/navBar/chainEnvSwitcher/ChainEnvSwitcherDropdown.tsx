import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChainEnv } from '@vertex-protocol/client';
import { PrimaryChainID, useEVMContext } from '@vertex-protocol/react-client';
import {
  joinClassNames,
  NextImageSrc,
  WithChildren,
} from '@vertex-protocol/web-common';
import {
  Divider,
  Icons,
  NavBarCardButton,
  PrimaryButton,
  Z_INDEX,
} from '@vertex-protocol/web-ui';
import { CHAIN_ICON_BY_CHAIN } from 'client/assets/chains/chainIcons';
import { SwitcherDropdownItemButton } from 'client/components/SwitcherDropdownItemButton';
import blitzIcon from 'client/modules/app/navBar/chainEnvSwitcher/assets/blitz-chain-env-switcher-icon.svg';
import { NavPopoverContentContainer } from 'client/modules/app/navBar/components/NavPopoverContentContainer';
import { NavPopoverHeader } from 'client/modules/app/navBar/components/NavPopoverHeader';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { clientEnv } from 'common/environment/clientEnv';
import { startCase } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
} from 'viem/chains';

interface NetworkOption {
  icon: NextImageSrc;
  label: string;
  primaryChainId: PrimaryChainID;
  chainEnv: ChainEnv;
}

const NETWORK_OPTIONS = ((): NetworkOption[] => {
  switch (clientEnv.base.dataEnv) {
    case 'vertexTestnet':
      return [
        {
          icon: CHAIN_ICON_BY_CHAIN[arbitrumSepolia.id],
          label: 'Arbitrum',
          primaryChainId: arbitrumSepolia.id,
          chainEnv: 'arbitrumTestnet',
        },
        {
          icon: CHAIN_ICON_BY_CHAIN[baseSepolia.id],
          label: 'Base',
          primaryChainId: baseSepolia.id,
          chainEnv: 'baseTestnet',
        },
        {
          icon: CHAIN_ICON_BY_CHAIN[mantleSepoliaTestnet.id],
          label: 'Mantle',
          primaryChainId: mantleSepoliaTestnet.id,
          chainEnv: 'mantleTestnet',
        },
        {
          icon: CHAIN_ICON_BY_CHAIN[seiTestnet.id],
          label: 'Sei',
          primaryChainId: seiTestnet.id,
          chainEnv: 'seiTestnet',
        },
      ];
    case 'vertexMainnet':
      return [
        {
          icon: CHAIN_ICON_BY_CHAIN[arbitrum.id],
          label: 'Arbitrum',
          primaryChainId: arbitrum.id,
          chainEnv: 'arbitrum',
        },
        {
          icon: CHAIN_ICON_BY_CHAIN[base.id],
          label: 'Base',
          primaryChainId: base.id,
          chainEnv: 'base',
        },
        {
          icon: CHAIN_ICON_BY_CHAIN[mantle.id],
          label: 'Mantle',
          primaryChainId: mantle.id,
          chainEnv: 'mantle',
        },
        {
          icon: CHAIN_ICON_BY_CHAIN[sei.id],
          label: 'Sei',
          primaryChainId: sei.id,
          chainEnv: 'sei',
        },
      ];
    default:
      console.log(
        '[ChainEnvSwitcherDropdown] Invalid dataEnv for chain switcher',
        clientEnv.base.dataEnv,
      );
      return [];
  }
})();

export function ChainEnvSwitcherDropdown() {
  const {
    primaryChain,
    primaryChainMetadata: { isTestnet },
    setPrimaryChainEnv,
    chainStatus: { isIncorrectChain },
    switchConnectedChain,
  } = useEVMContext();

  const triggerChainIcon = (
    <div className="relative">
      <Image
        src={CHAIN_ICON_BY_CHAIN[primaryChain.id]}
        alt={primaryChain.name}
        className="h-5 w-auto"
      />
      {isIncorrectChain && (
        <Icons.ExclamationMark
          className="bg-warning-muted text-warning absolute -bottom-0.5 -right-0.5 rounded-full"
          size={12}
        />
      )}
    </div>
  );

  const switchConnectedChainCta = isIncorrectChain && (
    <DropdownMenu.Item asChild>
      <PrimaryButton
        onClick={() => {
          switchConnectedChain();
        }}
      >
        Switch to {startCase(primaryChain.name)}
      </PrimaryButton>
    </DropdownMenu.Item>
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <NavBarCardButton
          className={joinClassNames(
            'flex aspect-square items-center justify-center',
            'data-[state=open]:bg-surface-2',
          )}
        >
          {triggerChainIcon}
        </NavBarCardButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content sideOffset={8} side="top" align="end" asChild>
        <NavPopoverContentContainer
          className={joinClassNames(
            'flex min-w-[180px] flex-col gap-y-2 p-1 text-sm',
            Z_INDEX.pagePopover,
          )}
        >
          {switchConnectedChainCta}
          <Section title="Network">
            {NETWORK_OPTIONS.map((option) => {
              const isActive = option.primaryChainId === primaryChain.id;

              return (
                <SwitcherDropdownItemButton
                  key={option.label}
                  startIcon={
                    <Image src={option.icon} alt="" className="h-4 w-auto" />
                  }
                  label={option.label}
                  active={isActive}
                  onClick={() => {
                    if (!isActive) {
                      setPrimaryChainEnv(option.chainEnv);
                    }
                  }}
                />
              );
            })}
          </Section>
          <DropdownMenu.Separator asChild>
            <Divider />
          </DropdownMenu.Separator>
          <Section title="Apps on other networks">
            <SwitcherDropdownItemButton
              as={Link}
              external
              href={
                isTestnet
                  ? VERTEX_SPECIFIC_LINKS.blitzTestnetApp
                  : VERTEX_SPECIFIC_LINKS.blitzApp
              }
              startIcon={
                <Image src={blitzIcon} alt="" className="h-4 w-auto" />
              }
              label="Blitz on Blast"
            />
          </Section>
        </NavPopoverContentContainer>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function Section({ title, children }: WithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <DropdownMenu.Label asChild>
        <NavPopoverHeader title={title} />
      </DropdownMenu.Label>
      <DropdownMenu.Group className="flex flex-col gap-y-1">
        {children}
      </DropdownMenu.Group>
    </div>
  );
}

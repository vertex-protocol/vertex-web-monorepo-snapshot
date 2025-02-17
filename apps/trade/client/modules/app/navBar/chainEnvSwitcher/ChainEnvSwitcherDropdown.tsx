import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  useEVMContext,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import {
  Divider,
  Icons,
  NavBarCardButton,
  PrimaryButton,
  Z_INDEX,
} from '@vertex-protocol/web-ui';
import { SwitcherDropdownItemButton } from 'client/components/SwitcherDropdownItemButton';
import blitzIcon from 'client/modules/app/navBar/chainEnvSwitcher/assets/blitz-chain-env-switcher-icon.svg';
import { CHAIN_ENV_SWITCHER_OPTIONS } from 'client/modules/app/navBar/chainEnvSwitcher/chainEnvSwitcherOptions';
import { NavPopoverContentContainer } from 'client/modules/app/navBar/components/NavPopoverContentContainer';
import { NavPopoverHeader } from 'client/modules/app/navBar/components/NavPopoverHeader';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { startCase } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

export function ChainEnvSwitcherDropdown() {
  const {
    primaryChain,
    primaryChainEnv,
    setPrimaryChainEnv,
    chainStatus: { isIncorrectChain },
    switchConnectedChain,
  } = useEVMContext();

  const {
    primaryChainMetadata: { isTestnet, chainIcon },
    getChainMetadata,
  } = useVertexMetadataContext();

  const triggerChainIcon = (
    <div className="relative">
      <Image src={chainIcon} alt={primaryChainEnv} className="h-5 w-auto" />
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
            Z_INDEX.popover,
          )}
        >
          {switchConnectedChainCta}
          <Section title="Network">
            {CHAIN_ENV_SWITCHER_OPTIONS.map((option) => {
              const isActive = option.chainEnv === primaryChainEnv;
              const { chainIcon } = getChainMetadata(option.chainEnv);
              return (
                <SwitcherDropdownItemButton
                  key={option.label}
                  startIcon={
                    <Image src={chainIcon} alt="" className="h-4 w-auto" />
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
              label="Blitz on Blast"
              as={Link}
              external
              href={
                isTestnet
                  ? VERTEX_SPECIFIC_LINKS.blitzTestnetApp
                  : VERTEX_SPECIFIC_LINKS.blitzApp
              }
              startIcon={<Image src={blitzIcon} alt="" className="size-4" />}
            />
          </Section>
        </NavPopoverContentContainer>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function Section({ title, children }: WithChildren<{ title: string }>) {
  return (
    <div className="flex flex-col gap-y-1">
      <DropdownMenu.Label asChild>
        <NavPopoverHeader title={title} />
      </DropdownMenu.Label>
      <DropdownMenu.Group className="flex flex-col gap-y-1">
        {children}
      </DropdownMenu.Group>
    </div>
  );
}

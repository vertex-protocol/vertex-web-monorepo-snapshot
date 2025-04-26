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
import brotradeIcon from 'client/modules/app/navBar/chainEnvSwitcher/assets/brotrade-chain-env-switcher-icon.svg';
import { CHAIN_ENV_SWITCHER_OPTIONS } from 'client/modules/app/navBar/chainEnvSwitcher/chainEnvSwitcherOptions';
import { NavPopoverContentContainer } from 'client/modules/app/navBar/components/NavPopoverContentContainer';
import { NavPopoverHeader } from 'client/modules/app/navBar/components/NavPopoverHeader';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { clientEnv } from 'common/environment/clientEnv';
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
    primaryChainEnvMetadata: { chainIcon },
    getChainEnvMetadata,
  } = useVertexMetadataContext();

  const triggerChainIcon = (
    <div className="relative">
      <Image src={chainIcon} alt={primaryChainEnv} className="h-5 w-auto" />
      {isIncorrectChain && (
        <Icons.ExclamationMark
          className="bg-warning-muted text-warning absolute -right-0.5 -bottom-0.5 rounded-full"
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
        <NavBarCardButton className="data-[state=open]:bg-surface-2 aspect-square justify-center">
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
              const { chainIcon } = getChainEnvMetadata(option.chainEnv);

              // Only show the extra UI when not active as there isn't space for the icon AND the active indicator
              const showNewRewardsPromo = option.promoteNewRewards && !isActive;

              const buttonLabel = showNewRewardsPromo ? (
                <div className="flex items-center gap-x-2">
                  <span>{option.label}</span>
                  <span className="text-accent text-3xs">
                    <Icons.Sparkle size={12} className="inline" /> New Rewards
                  </span>
                </div>
              ) : (
                option.label
              );

              return (
                <SwitcherDropdownItemButton
                  key={option.chainEnv}
                  startIcon={
                    <Image src={chainIcon} alt="" className="h-4 w-auto" />
                  }
                  label={buttonLabel}
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
              label={
                <>
                  Blitz{' '}
                  <span className="text-text-tertiary text-xs">on Blast</span>
                </>
              }
              as={Link}
              external
              href={
                clientEnv.isTestnetDataEnv
                  ? VERTEX_SPECIFIC_LINKS.blitzTestnetApp
                  : VERTEX_SPECIFIC_LINKS.blitzApp
              }
              startIcon={<Image src={blitzIcon} alt="" className="size-4" />}
            />
            <SwitcherDropdownItemButton
              label={
                <>
                  Bro.trade{' '}
                  <span className="text-text-tertiary text-xs">
                    on Berachain
                  </span>
                </>
              }
              as={Link}
              external
              href={VERTEX_SPECIFIC_LINKS.brotradeApp}
              startIcon={<Image src={brotradeIcon} alt="" className="size-4" />}
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

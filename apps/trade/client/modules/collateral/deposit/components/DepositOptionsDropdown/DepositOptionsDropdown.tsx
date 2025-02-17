import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import {
  DropdownUi,
  Icons,
  NavCardButton,
  NavCardButtonProps,
  SecondaryButton,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BnbLogoIcon } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/BnbLogoIcon';
import { EthLogoIcon } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/EthLogoIcon';
import { MastercardLogoIcon } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/MastercardLogoIcon';
import { OptimismLogoIcon } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/OptimismLogoIcon';
import { VisaLogoIcon } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/VisaLogoIcon';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { useMemo, useState } from 'react';

interface Props {
  triggerClassName?: string;
  contentClassName?: string;
  /**
   * If true, the dropdown will show the wallet option as selected
   */
  isDirectDepositSelected?: boolean;
  /**
   * If true, the deposit option icons in the trigger will be hidden. This is useful when there is limited horizontal space
   */
  hideTriggerIcons?: boolean;
}

const mastercardIcon = <MastercardLogoIcon className="h-2 w-auto" />;
const visaIcon = <VisaLogoIcon className="h-2 w-auto" />;
const ethIcon = <EthLogoIcon className="h-3 w-auto" />;
const bnbIcon = <BnbLogoIcon className="h-3 w-auto" />;
const opIcon = <OptimismLogoIcon className="h-3 w-auto" />;
const walletIcon = <Icons.Wallet />;
const crossChainIcon = <Icons.Link />;

export function DepositOptionsDropdown({
  triggerClassName,
  contentClassName,
  isDirectDepositSelected,
  hideTriggerIcons,
}: Props) {
  const { push } = useDialog();
  const isConnected = useIsConnected();
  const [open, setOpen] = useState(false);
  const { isBridgeEnabled, isOnrampEnabled } = useEnabledFeatures();

  const depositOptions = useMemo((): NavCardButtonProps[] => {
    const crossChainDepositOption: NavCardButtonProps = {
      title: 'Cross-Chain',
      description: (
        <div className="flex items-center gap-x-1">
          Deposit from 10+ chains
          <IconsAndMore>
            {ethIcon}
            {opIcon}
            {bnbIcon}
          </IconsAndMore>
        </div>
      ),
      disabled: !isConnected,
      onClick: () => push({ type: 'bridge', params: {} }),
    };

    const buyOption: NavCardButtonProps = {
      title: 'Buy Crypto',
      description: (
        <div className="flex items-center gap-x-1">
          Buy and deposit with fiat
          <IconsAndMore>
            {mastercardIcon}
            {visaIcon}
          </IconsAndMore>
        </div>
      ),
      disabled: !isConnected,
      onClick: () => push({ type: 'transak_onramp_notice', params: {} }),
    };

    return [
      {
        title: 'Wallet',
        description: 'Deposit assets in your wallet',
        disabled: !isConnected,
        active: isDirectDepositSelected,
        onClick: () => {
          if (isDirectDepositSelected) {
            return;
          }
          push({ type: 'deposit', params: {} });
        },
      },
      ...(isBridgeEnabled ? [crossChainDepositOption] : []),
      ...(isOnrampEnabled ? [buyOption] : []),
    ];
  }, [
    isConnected,
    isDirectDepositSelected,
    isBridgeEnabled,
    isOnrampEnabled,
    push,
  ]);

  const triggerContent = (() => {
    const depositOptionIcons = !hideTriggerIcons ? (
      <IconsAndMore>
        {walletIcon}
        {crossChainIcon}
        {visaIcon}
        {mastercardIcon}
      </IconsAndMore>
    ) : null;

    return (
      <div
        className={joinClassNames(
          'flex items-center gap-x-6',
          // Push the icons to the end only when we're showing them, otherwise, we want the label & chevron to be together
          !!depositOptionIcons && 'flex-1 justify-between',
        )}
      >
        {isDirectDepositSelected ? 'Wallet' : 'Deposit'}
        {depositOptionIcons}
      </div>
    );
  })();

  return (
    <DropdownMenu.Root onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <SecondaryButton
          className={triggerClassName}
          endIcon={<UpDownChevronIcon open={open} />}
          disabled={!isConnected}
        >
          {triggerContent}
        </SecondaryButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content asChild align="start" sideOffset={4}>
        <DropdownUi.Content
          className={joinClassNames(
            'min-w-[var(--radix-dropdown-menu-trigger-width)]',
            contentClassName,
          )}
        >
          {depositOptions.map((props, index) => {
            return (
              <DropdownMenu.Item key={index} asChild>
                <NavCardButton
                  {...props}
                  stateClassNameOverrides="data-[highlighted]:before:bg-overlay-hover"
                />
              </DropdownMenu.Item>
            );
          })}
        </DropdownUi.Content>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

function IconsAndMore({ children }: WithChildren) {
  return (
    <div className="text-text-tertiary flex items-center gap-x-0.5">
      {children}
      <span className="text-2xs">+more</span>
    </div>
  );
}
